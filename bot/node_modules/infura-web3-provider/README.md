# infura-web3-provider
HD Wallet-enabled Web3 provider. Use it to sign transactions for addresses derived from a 12-word mnemonic/privateKey.

## Install

```
$ npm install infura-web3-provider
```

## General Usage

You can use this provider wherever a Web3 provider is needed.

```javascript
var InfuraWalletProvider = require("infura-web3-provider");
var mnemonic = "opinion destroy betray ..."; // 12 word mnemonic
var pvtKey = "6fd....."; // private key string
var provider = new InfuraWalletProvider(mnemonic,"<infuraToken>","ropsten/mainnet");
var provider = new InfuraWalletProvider(pvtKey,"<infuraToken>","ropsten/mainnet");
```

By default, the `InfuraWalletProvider` will use the address of the first address that's generated from the mnemonic.

Parameters:

- `mnemonic`: `string`. 12 word mnemonic which addresses are created from.
- `pvtKey`: `string`. Private key in string.
- `infuraToken`: `string` or 'array'. Your infura token generated from the website.
- `network`: `string`, Network can be "ropsten" or "mainnet". Default "ropsten"

## Truffle Usage

You can easily use this within a Truffle configuration. For instance:

truffle.js
```javascript
var InfuraWalletProvider = require("infura-web3-provider");

var mnemonic = "opinion destroy betray ...";
var pvtKey = "6fd....";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new InfuraWalletProvider(mnemonic/pvtKey, "<infuraToken>"),
      network_id: 3
    }
  }
};
```
