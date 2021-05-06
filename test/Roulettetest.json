var Roullette = artifacts.require("./Roullette");
var Roullette = artifacts.require("Roullette");
const { reverts } = require('truffle-assertions');
const truffleAssert = require('truffle-assertions');
const Web3 = require('web3');

contract('Roullette', function(accounts){

  let roullette;

  it("Should run before each function", function(){
  beforeEach(async () => {
    roullette = await Roullette.deployed();
    Player = await accounts[0];

  });
});


  it("Should run after each function", function(){
  afterEach(async () => {
    roullette = await Roullette.deployed();
  });
});


  it("Should return casino's deposit", function(){
  return Roullette.deployed().then(function(instance){
    return instance.getCasinoDeposit.call();
  }).then(function(casinoDeposit){
    assert.equal(casinoDeposit, 0, "The casinos deposit was not returned");
    });
  });


  it("Should return the winning number for the WinningNumber function ", async () => {
    const instance = await Roullette.deployed();
    //await instance.WinningNumber(); //throws an error due to require function written in contract
    await truffleAssert.reverts(instance.WinningNumber());
  });


  it("Should initialize max bet to 1 eth.", async () => {
    const casino = 0;
    const instance = await Roullette.deployed();
    instance.setMaxBet(Web3.utils.toWei('1','ether')).then(
      async()=>{
        const _maxBet = await instance.maxBet();
        assert.equal(Web3.utils.fromWei(_maxBet,'ether'),1,'not equal');
      }
    );
  })


  it('should set new hash with new winning number/start betting phase',async()=>{
      await roullette.setWinningNumber(12).then(
          async()=>{
              await roullette.setCommitmentHash();
              const newHash =await roullette.getCommitmentHash();
              console.log(newHash+'');
              truffleAssert.passes(newHash);
          }
      )
  });


  it('should place Bet under right conditions',async()=>{
      await roullette.depositMoney({from:accounts[0],value:360000});
      await truffleAssert.passes(roullette.placeBet([[1000,1,2,3],[100,4,5]],{from:accounts[1],value:1100}));
      await truffleAssert.reverts(roullette.placeBet([[1000,1,2,3],[100,4,5]],{from:accounts[1],value:1000}));// not enough bet total
      await truffleAssert.reverts(roullette.placeBet([[1000,1,2,3],[100,4,5]],{from:accounts[0],value:1100})); // casino player account[0] cannot play

  });

  it('should get casino deposit',async()=>{
      const deposit = await roullette.getCasinoDeposit();
      assert.equal(deposit,360000);
  })

  it('should change max Bet value',async()=>{
      const newMaxBet= 10000000;
      await roullette.setMaxBet(newMaxBet);
      const newBet = await roullette.maxBet();
      assert.equal(newBet,newMaxBet);
  })

  it('should show player bets',async()=>{
      const bets = await roullette.seeBets({from:accounts[1]});
      console.log(bets);
      truffleAssert.passes(bets);
  });

  it('should reveal winning number',async()=>{
      await roullette.revealWinningNumber(12,{from:accounts[0]}).then(
          async()=>{
              const Wn = await roullette.WinningNumber();
              assert.equal(Wn,12);
          }
      )
  });

  it('should Remove Bet',async()=>{
      truffleAssert.passes(roullette.removeBet(1,{from:accounts[1]}));
      truffleAssert.reverts(roullette.removeBet(3,{from:accounts[1]}));//Only 2 bets, index out of range,Error
  })

})
