pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;


contract Roulette { 
    
    struct Bet {
        uint256[] numbers;
        uint256 multiplier;
        uint256 betAmount;
    }
    
    struct Player {
        address payable playerAddress;
        bool playerExists; // Whether the player has already been added to map and array;
        bool win; // Whether the player won or lost
        bool lastWin; // Result of last game
        int256 lastAmount; // Amount won or lost in the last game
        // bool gameInProgress; // Whether the player is currently playing a game
        Bet[] bets;
        int256 totalWinnings; // Keeps track of player balance
    }
    
    event  bettingPhaseOpen();
    event bettingPhaseClosed();
    
    mapping(address => Player) playerMap; // Map containing all players playing the game (this is not iterable)
    address[] playerAddressArray; // Array of all players addresses of players playing the game (this is iterable)
    address payable casino;  // Address of the casino, will not change after contract is deployed
    uint256 casinoDeposit = 0; // Value of the casino deposit
    uint256 maxBet = .001 ether; 
    address payable contractAddress = address(this);  // Address of this contract
    bytes32 public commitHash = 0;
    uint256 winningNumber = 38;
    bytes32 lastCommitHash;
    uint256 lastWinningNumber;
    bool wheelSpun = false;
    bytes32 nonce;
    
    bool bettingPhase  = false;
    bool payingPhase = true ;
    bool resetPhase = false;

    constructor () public payable{
        // Casino initiates the contract
        casino = msg.sender;
    }
    
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
    
    // Function to send a value of money to an address
    function sendViaCall(address payable _to, uint256 _amount) internal {
        (bool sent, bytes memory data) = _to.call{value: _amount}(""); 
        require(sent, "Failed to send Ether");
    }
    
    // Function for the casino to deposit money, must be called for the rest of the contract to work
    function depositMoney() public payable {
        require(msg.sender == casino, "Only the casino can deposit money");
        casinoDeposit = casinoDeposit + msg.value;
        sendViaCall(contractAddress, msg.value);
    }
    
    function getCasinoDeposit() public view returns (uint256){
        return casinoDeposit;
    }
    
    function getCommitmentHash() public view returns (bytes32){
        return commitHash;
        
    }
    
    function withdrawCasinoDeposit(uint256 amount) external {
        require(msg.sender == casino, "Only the casino can withdraw money");
        casinoDeposit = casinoDeposit - amount;
        sendViaCall(msg.sender, amount);
    }
    
    function setCommitmentHash(bytes32 _outcomeHash) external returns (bytes32) {
        require (resetPhase, "cannot set commitment hash during this phase");
        require (msg.sender == casino, "Only the casino can generate outcome");
        require (commitHash == 0, "Hash already created");
        commitHash = _outcomeHash;
        resetPhase = false;
        bettingPhase = true;
        emit bettingPhaseOpen();
        return commitHash;
    }
    
    // Function for the casino to match the bet amount
    function matchBet(uint256 _betAmount) internal {
        casinoDeposit = casinoDeposit - _betAmount; // bet amount is deducted from casinoDeposit and but remains in the contract balance
    }
    
    function placeBet(uint256[][] calldata _bets) external payable {
        require(bettingPhase, "Betting is not open");
        address _playerAddress = msg.sender;
        // require(_playerAddress != casino, "Casino cannot be a player");
        require(msg.value * 36 < casinoDeposit, "Casino cannot cover bet"); // Bet must be less than the money in the casino deposit to ensure casino can cover the bet
        require(msg.value >= 1 wei, "Bets must be  at least 1 wei"); // Must be greater or equal to minimum bet of 1 wei
        // require(msg.value <= maxBet, "Max bet exceeded"); // Must be less than or equal to max bet of .001 ether
        
        if( !playerMap[_playerAddress].playerExists) { // If player is new
            playerAddressArray.push(msg.sender); // Add player address to array of player addresses
            playerMap[_playerAddress].playerAddress = msg.sender; 
            playerMap[_playerAddress].playerExists = true;
        }
        
        setBet(_playerAddress, _bets, msg.value);
        sendViaCall(contractAddress, msg.value);
    }
    
    // sample nonce: 0x3ac225168df54212a25c1c01fd35bebfea408fdac2e31ddd6f80a4bbf9a5f1cb
    // sample number: 20
    // sample commitHash: 0xf93eed68034dba759863259ca8eeb952ef5275db301ee8afe2da218326801d7e
    
    // This is the spin wheel function
    function revealWinningNumber(uint256 _winningNumber, bytes32 _nonce) public payable returns (uint256){
        require(msg.sender == casino, "Only the casino can revealWinningNumber");
        require(keccak256(abi.encodePacked(_winningNumber, _nonce)) ==  commitHash, "Hash doesn't match"); // Ensures winning winningNumber was not changed
        bettingPhase = false;
        payingPhase = true;
        emit bettingPhaseClosed();
        winningNumber = _winningNumber;
        lastCommitHash = commitHash;
        lastWinningNumber = winningNumber;
        nonce = _nonce;
        payout();
        return winningNumber;
    }
    
    function WinningNumber() public view returns (uint256)  {
        require(payingPhase, "Cannot see winning number during this phase");
        return winningNumber;
    }
    
    function payout() internal{
        require(payingPhase, "Payout cannot occur during this phase");
        for (uint n = 0; n < playerAddressArray.length; n++){
            address _playerAddress = playerAddressArray[n];
            uint256 winAmount = 0;
            uint256 loseAmount;
            for(uint256 i = 0; i < playerMap[_playerAddress].bets.length; i++){ // Loop through players bets
                playerMap[_playerAddress].win = false;
                if (winningNumber == 0  || winningNumber == 38){ // Winning number is 0 or 00
                    playerMap[_playerAddress].win = (playerMap[_playerAddress].bets[i].numbers[0] == winningNumber);
                }
                else if(playerMap[_playerAddress].bets[i].numbers[0] == 39){ // Evens
                    playerMap[_playerAddress].win = (winningNumber % 2 == 0);
                }
                else if (playerMap[_playerAddress].bets[i].numbers[0] == 40){ // Odds
                    playerMap[_playerAddress].win = (winningNumber % 2 == 1);
                }
                else if (playerMap[_playerAddress].bets[i].numbers[0] == 41){  // Blacks
                    if (winningNumber <= 10 || (winningNumber >= 20 && winningNumber <= 28)) {
                        playerMap[_playerAddress].win = (winningNumber % 2 == 0);
                    } 
                    else {
                        playerMap[_playerAddress].win = (winningNumber % 2 == 1);
                    }
                }
                else if (playerMap[_playerAddress].bets[i].numbers[0] == 42 && winningNumber % 2 == 0){ // Reds
                    if (winningNumber <= 10 || (winningNumber >= 20 && winningNumber <= 28)) {
                        playerMap[_playerAddress].win = (winningNumber % 2 == 1);
                    } 
                    else {
                         playerMap[_playerAddress].win = (winningNumber % 2 == 0);
                    }
                }
                else if (playerMap[_playerAddress].bets[i].numbers[0] == 43){ // First dozen
                    playerMap[_playerAddress].win = (winningNumber <= 12);
                }
                else if (playerMap[_playerAddress].bets[i].numbers[0] == 44){ // Second dozen
                    playerMap[_playerAddress].win = (winningNumber > 12 && winningNumber <= 24);
                }
                else if (playerMap[_playerAddress].bets[i].numbers[0] == 45){ // Third dozen
                    playerMap[_playerAddress].win = (winningNumber > 24);
                }
                else if (playerMap[_playerAddress].bets[i].numbers[0] == 46){ // First Column
                    playerMap[_playerAddress].win = (winningNumber % 3 == 1);
                }
                else if (playerMap[_playerAddress].bets[i].numbers[0] == 47){ // Second Column
                    playerMap[_playerAddress].win = (winningNumber % 3 == 2);
                }
                else if (playerMap[_playerAddress].bets[i].numbers[0] == 48){ // Third Column
                    playerMap[_playerAddress].win = (winningNumber % 3 == 0);
                }
                else {
                    for(uint256 j = 0; j < playerMap[_playerAddress].bets[i].numbers.length; j++){ // Loop through every winningNumber in the bet
                        if(playerMap[_playerAddress].bets[i].numbers[j] == winningNumber){ // Check if any are individual winning number
                            playerMap[_playerAddress].win = true;
                            break;
                        }
                    }
                }
                if (playerMap[_playerAddress].win == false){
                    loseAmount = loseAmount + playerMap[_playerAddress].bets[i].betAmount;
                }
                else{
                    winAmount = winAmount + playerMap[_playerAddress].bets[i].multiplier * playerMap[_playerAddress].bets[i].betAmount;
                }
            }
            playerMap[_playerAddress].lastWin = playerMap[_playerAddress].win;
            playerMap[_playerAddress].lastAmount = (int256(winAmount) - int256(loseAmount));
            payCasino(loseAmount);
            payPlayer(winAmount, _playerAddress);
            updateWinnings(winAmount, loseAmount, _playerAddress);
        }
        
    }
    
    function setBet(address _playerAddress, uint256[][] calldata _bets, uint256 _betTotal) internal{
        // Sample Bets [[100,1,2,3,4],[100,20],[100,1,2,3,4,5,6,7,8,9,10,11,12]]
        uint256 betTotal = 0;
        uint256 n = _bets.length;
        for(uint i = 0; i < n; i++){
            betTotal += _bets[i][0];
        }
        require(betTotal == _betTotal, "Bet amount not equivalent to total bets");
        for(uint i = 0; i < n; i++){
            uint256 betAmount = _bets[i][0];
            uint256 multiplier = 36/(_bets[i].length - 1);
            if(_bets[i][1] == 39 || _bets[i][1] == 40 || _bets[i][1] == 41 || _bets[i][1] == 42){ // Evens
                multiplier = 2;
            }
            else if (_bets[i][1] == 43 || _bets[i][1] == 44 || _bets[i][1] == 45 || _bets[i][1] == 46 || _bets[i][1] == 47 || _bets[i][1] == 48){ // First dozen
                multiplier = 3;
            }
            uint256[] memory numbers = new uint256[](_bets[i].length - 1);
            for(uint j = 1; j < _bets[i].length; j++){
                numbers[j-1]= _bets[i][j];
            }
            playerMap[_playerAddress].bets.push(Bet(numbers,multiplier,betAmount));
        }
    }
    
    function payCasino(uint256 amount) internal{
        casinoDeposit = casinoDeposit + amount;
    }
    
    function payPlayer(uint256 amount, address _playerAddress) internal{
        casinoDeposit = casinoDeposit - amount;
        sendViaCall(playerMap[_playerAddress].playerAddress, amount);
        uint256 numberOfBets = playerMap[_playerAddress].bets.length;
        for(uint256 i = 0; i < numberOfBets; i++){
            playerMap[_playerAddress].bets.pop;
        }
    }
    
    // Funtion to return total balance of the contract which is casinoDeposit + all bets currently on the table
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    // See current players bets
    function seeBets() public view returns (Bet[] memory){
        return playerMap[msg.sender].bets;
    }
    
    function seePlayerWinnings() public view returns (int256){
        return playerMap[msg.sender].totalWinnings;
    }
    
    function updateWinnings(uint256 winAmount, uint256 loseAmount, address _playerAddress) internal{
        playerMap[_playerAddress].totalWinnings = playerMap[_playerAddress].totalWinnings + int256(winAmount - loseAmount);
    }
    
    function gameReset() external{
        require(msg.sender == casino, "Only the casino can reset game");
        require(payingPhase, "cannot resest game during this phase");
        payingPhase = false;
        resetPhase = true;
        commitHash = 0;
        winningNumber = 38;
        for (uint i = 0; i < playerAddressArray.length; i++){
            while(playerMap[playerAddressArray[i]].bets.length > 0){
                playerMap[playerAddressArray[i]].bets.pop();
            }
            playerMap[playerAddressArray[i]].win = false;
        }
    }
    
    function removeBet(uint index) public {
        address _playerAddress = msg.sender;
        if (index >= playerMap[_playerAddress].bets.length) return ;
        for (uint i = index; i< playerMap[_playerAddress].bets.length - 1; i++){
            playerMap[_playerAddress].bets[i] = playerMap[_playerAddress].bets[i+1];
        }
        playerMap[_playerAddress].bets.pop();
    }
    
    function getGameState() public view returns (string memory) {
        string  memory str;
        if (bettingPhase){
            str  = "bettingPhase";
        }  
        else if (payingPhase){
            str = "payingPhase";
        }
        else if (resetPhase) {
            str = "resetPhase";
        }
        return (str);
    }
    
    function getLastGameResults() public view returns (bool, int256, uint256,  bytes32, bytes32) {
        return (playerMap[msg.sender].lastWin, playerMap[msg.sender].lastAmount, lastWinningNumber, nonce,  lastCommitHash);
    }
    
    
}