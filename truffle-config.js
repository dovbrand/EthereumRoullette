const path = require('path');
require('dotenv').config();

// const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const HDWalletProvider = require("@truffle/hdwallet-provider")
// const privateKey = 'banner exhaust junk reveal armed grab gorilla deposit digital ready pitch catalog';
// const endpointUrl = "https://kovan.infura.io/v3/4f42d33ad63a41bf897a2c84029fec3e";
/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    // kovan: {
    //   networkCheckTimeout: 10000, 
    //   provider: () =>
    //     new HDWalletProvider({
    //       //private keys array
    //       mnemonic: {
    //         phrase: "banner exhaust junk reveal armed grab gorilla deposit digital ready pitch catalog"
    //       },
    //       //url to ethereum node
    //       providerOrUrl: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //       shareNonce: true,
    //     }), 
    //   network_id: 42, 
    //   gas: 7500000,
    //   gasPrice: 2500000000 //2.5 gwei
    // },
  },

  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  
  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.6.6",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
