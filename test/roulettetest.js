var Roullette = artifacts.require("./Roullette");

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
});
