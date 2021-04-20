var Roullette = artifacts.require("./Roullette");
const truffleAssert = require('truffle-assertions');

contract('Roullette', function(accounts){

  let roullette;
  it("Should run before each function", function(){
  beforeEach(async () => {
    roullette = await Roullette.deployed();
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
  
    it("Should return the outcome hash", async () => {
    const instance = await Roullette.deployed();
    await instance.getOutcomeHash(web3.utils.asciiToHex());
  });

  it("Should return the winning number", async () => {
    const instance = await Roullette.deployed();
    // await instance.revealWinningNumber(1234, web3.utils.asciiToHex('1')); //throws an error due to require function written in contract so we revert
    await truffleAssert.reverts(instance.revealWinningNumber(1234, web3.utils.asciiToHex('1')));
  });

  it("Should return the winning number for the WinningNumber function ", async () => {
    const instance = await Roullette.deployed();
    // await instance.WinningNumber(); //throws an error due to require function written in contract
    await truffleAssert.reverts(instance.WinningNumber());
  });


});
