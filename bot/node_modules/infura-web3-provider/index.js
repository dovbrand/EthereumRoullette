var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var walletUtils = require('ethereumjs-wallet');
var ProviderEngine = require("web3-provider-engine");
var FiltersSubprovider = require('web3-provider-engine/subproviders/filters.js');
var HookedSubprovider = require('web3-provider-engine/subproviders/hooked-wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
var Transaction = require('ethereumjs-tx');

function InfuraWalletProvider(secret, token, network) {
  if (secret.trim().split(/\s+/).length == 1) {
    this.pvtKey = secret.substring(0, 2) == '0x' ? secret.substring(2) : secret;
    this.wallet = walletUtils.fromPrivateKey(Buffer.from(this.pvtKey, 'hex'));
    this.addresses = [];
    this.address = '0x' + this.wallet.getAddress().toString('hex');
    this.addresses.push(this.address);
    if (token.constructor === Array) token = token[Math.floor(Math.random() * token.length)]
    this.provider_url = network == "mainnet" ? "https://mainnet.infura.io/" + token : "https://ropsten.infura.io/" + token;
    console.log(this.provider_url)
    const tmp_accounts = this.addresses;
    const tmp_account = this.address;
    const tmp_wallet = this.wallet;
    this.engine = new ProviderEngine();
    this.engine.addProvider(new HookedSubprovider({
      getAccounts: function(cb) { cb(null, tmp_accounts) },
      getPrivateKey: function(address, cb) {
        if (tmp_account != address) { return cb('Account not found'); } else { cb(null, tmp_wallet.getPrivateKey().toString('hex')); }
      },
      signTransaction: function(txParams, cb) {
        let pkey;
        if (tmp_account == [txParams.from]) { pkey = tmp_wallet.getPrivateKey(); } else { cb('Account not found'); }
        var tx = new Transaction(txParams);
        tx.sign(pkey);
        var rawTx = '0x' + tx.serialize().toString('hex');
        cb(null, rawTx);
      }
    }));
    this.engine.addProvider(new FiltersSubprovider());
    this.engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(this.provider_url)));
    this.engine.start(); // Required by the provider engine.
  } else {
    this.mnemonic = secret;
    this.wallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(this.mnemonic));
    this.wallet_hdpath = "m/44'/60'/0'/0/";
    this.provider_url = network == "mainnet" ? "https://mainnet.infura.io/" + token : "https://ropsten.infura.io/" + token;
    console.log(this.provider_url)
    this.wallets = {};
    this.addresses = [];
    for (let i = 0; i <= 1; i++) {
      var wallet = this.wallet.derivePath(this.wallet_hdpath + i).getWallet();
      var addr = '0x' + wallet.getAddress().toString('hex');
      this.addresses.push(addr);
      this.wallets[addr] = wallet;
    }
    const tmp_accounts = this.addresses;
    const tmp_wallets = this.wallets;

    this.engine = new ProviderEngine();
    this.engine.addProvider(new HookedSubprovider({
      getAccounts: function(cb) { cb(null, tmp_accounts) },
      getPrivateKey: function(address, cb) {
        if (!tmp_wallets[address]) { return cb('Account not found'); } else { cb(null, tmp_wallets[address].getPrivateKey().toString('hex')); }
      },
      signTransaction: function(txParams, cb) {
        let pkey;
        if (tmp_wallets[txParams.from]) { pkey = tmp_wallets[txParams.from].getPrivateKey(); } else { cb('Account not found'); }
        var tx = new Transaction(txParams);
        tx.sign(pkey);
        var rawTx = '0x' + tx.serialize().toString('hex');
        cb(null, rawTx);
      }
    }));
    this.engine.addProvider(new FiltersSubprovider());
    this.engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(this.provider_url)));
    this.engine.start(); // Required by the provider engine.
  }
}

function secretWallet(secret, token, network) {

};

function HDWallet(secret, token, network) {

};

InfuraWalletProvider.prototype.sendAsync = function() {
  this.engine.sendAsync.apply(this.engine, arguments);
};

InfuraWalletProvider.prototype.send = function() {
  return this.engine.send.apply(this.engine, arguments);
};

// returns the address of the given address_index, first checking the cache
InfuraWalletProvider.prototype.getAddress = function(idx) {
  if (!idx) { return this.addresses[0]; } else { return this.addresses[idx]; }
}

// returns the addresses cache
InfuraWalletProvider.prototype.getAddresses = function() {
  return this.addresses;
}

module.exports = InfuraWalletProvider;
