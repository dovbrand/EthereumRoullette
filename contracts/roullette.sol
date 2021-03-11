pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;


contract Roullette { 
    
    struct Bet {
        uint256[] numbers;
        uint256 multiplier;
        uint256 betAmount;
    }
    
    struct Player {
        address payable playerAddress;
        bool playerExists; // Whether the player has already been added to map and array;
        bool win; // Whether the player won or lost
        // bool gameInProgress; // Whether the player is currently playing a game
        // uint256 result;
        Bet[] bets;
        int256 totalWinnings; // Keeps track of player balance
    }
    
    // struct Game {
    //     Player[] playersInGame;
    //     uint256 gameTimeOut;
    //     uint256 winningNumber;
    //     mapping(address => player) playersInGame;
    // }
    
    // mapping(uint256 => Game) gameMap;
    
    mapping(address => Player) playerMap; // Map containing all players playing the game (this is not iterable)
    address[] playerAddressArray; // Array of all players addresses of players playing the game (this is iterable)
    address payable casino;  // Address of the casino, will not change after contract is deployed
    uint256 public casinoDeposit = 0; // Value of the casino deposit
    uint256 maxBet = .001 ether; 
    address payable contractAddress = address(this);  // Address of this contract
    bytes32 commitHash = 0;
    uint256 winningNumber = 38;
    uint256 lastWinningNumber;
    bytes32 nonce;
    uint256 gameTimeOut;
    bool wheelSpun = false;
    
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
    }
    
    
    // How can we automate this?
    function getOutcomeHash() public returns (bytes32) {
        require (commitHash == 0, "Hash already created");
        winningNumber = uint256(keccak256(abi.encodePacked(now, msg.sender))) % 38;
        nonce = keccak256(abi.encodePacked(now));
        commitHash = keccak256(abi.encodePacked(winningNumber, nonce));
        gameTimeOut = now + 1 minutes;
        return commitHash;
    }
    
    // Function for the casino to match the bet amount
    function matchBet(uint256 _betAmount) internal {
        casinoDeposit = casinoDeposit - _betAmount; // bet amount is deducted from casinoDeposit and but remains in the contract balance
    }
    
    function placeBet(uint256[] memory _numbers) public payable {
        require (now < gameTimeOut, "Betting period has ended");
        address _playerAddress = msg.sender;
        require(_playerAddress != casino, "Casino cannot be a player");
        require(msg.value < casinoDeposit, "Casino cannot cover bet"); // Bet must be less than the money in the casino deposit to ensure casino can cover the bet
        require(msg.value >= 1 wei, "Bets must be  at least 1 wei"); // Must be greater or equal to minimum bet of 1 wei
        require(msg.value <= maxBet, "Max bet exceeded"); // Must be less than or equal to max bet of .001 ether
        
        if( !playerMap[_playerAddress].playerExists) { // If player is new
            playerAddressArray.push(msg.sender); // Add player address to array of player addresses
            playerMap[_playerAddress].playerAddress = msg.sender; 
            playerMap[_playerAddress].playerExists = true;
        }
        
        playerMap[_playerAddress].bets.push(setBet(_numbers, msg.value));
    }
    
    function spinWheel() public payable returns (uint256){
        require(now > gameTimeOut, "Must wait for betting to end"); 
        require(keccak256(abi.encodePacked(winningNumber, nonce)) ==  commitHash, "Hash doesn't match"); // Ensures winning number was not changed
        payout(msg.sender);
        return winningNumber;
    }
    
    function revealWinningNumber() public view returns (uint256)  {
        require (gameTimeOut > now, "Betting still in progress");
        return winningNumber;
    }
    
    function payout(address _playerAddress) internal{
        uint256 winAmount = 0;
        uint256 loseAmount;
        for(uint256 i = 0; i < playerMap[_playerAddress].bets.length; i++){ // Loop through players bets
            bool win = false;
            for(uint256 j = 0; j < playerMap[_playerAddress].bets[i].numbers.length; j++){ // Loop through every number in the bet
                
                if(playerMap[_playerAddress].bets[i].numbers[j] == winningNumber){ // Check if any are winning number
                    winAmount = winAmount + playerMap[_playerAddress].bets[i].multiplier * playerMap[_playerAddress].bets[i].betAmount;
                    win = true;
                    break;
                }
            }
            if (win == false){
                loseAmount = loseAmount + playerMap[_playerAddress].bets[i].betAmount;
            }
        }
        payCasino(loseAmount);
        payPlayer(winAmount, _playerAddress);
        updateWinnings(winAmount, loseAmount, _playerAddress);
        gameReset();
    }
    
    function setBet(uint256[] memory _numbers, uint256 _betAmount) internal pure returns ( Bet memory){
        Bet memory _bet;
        _bet.numbers = _numbers;
        _bet.multiplier = 36/_numbers.length;
        _bet.betAmount = _betAmount;
        return _bet;
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
    
    // Automate this?
    function gameReset() internal{
        require(commitHash != 0);
        commitHash = 0;
        lastWinningNumber = winningNumber;
        winningNumber = 38;
    }
    
    // TODO: Allow players to withdraw bets
    // TODO: Break into small games?
    // TODO: Automate casino processes (getOutcomeHash, gameReset)
    // TODO: How to implement randomness
    
    
    
}
