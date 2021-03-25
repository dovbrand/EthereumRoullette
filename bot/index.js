require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const moment = require('moment-timezone')
const numeral = require('numeral')
const _ = require('lodash')

// SERVER CONFIG
const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${ PORT }`))

// WEB3 CONFIG
const web3 = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, process.env.RPC_URL) )

const CONTRACT_ADDRESS ="";
const CONTRACT_ABI = "";
const RouletteContract = new web3.eth.Contract(DAI_ABI, DAI_ADDRESS);

async function depositMoney(){
  // Should depsoit money to make casino deposit 1 ether
}

async function generateHash(){
// Generate Random Number
// Generate Random Hash
// Hash together
// Send to smart contract
}

async function revealWinningNumber(){
  // Send winning number and hash
}

async function resetContract(){
// Should run reset function in smart contract
}

async function runScript(){
  // Get Deposit Value
  // If too low deposit money
  if(casinoDeposit < MIN_DEPOSIT){
    casinoDeposit();
  }

  // Get Casino Hash
  if (casinoHash = "0" ){ // Game does not contain hash yet
    // Initial Phase - pick winning number and hash it
    generateHash();
  }
  // Wait until betting is complete and reveal winning number
  revealWinningNumber();

  // After revealing the number reset the contract
  resetContract();
}

// Check markets every n seconds
const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 1000 // 1 Second
script = setInterval(async () => { await runScript() }, POLLING_INTERVAL)
