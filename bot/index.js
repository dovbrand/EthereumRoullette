require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const moment = require('moment-timezone')
const numeral = require('numeral')
const _ = require('lodash')
const { bool } = require('assert-plus')

// SERVER CONFIG
const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${PORT}`))

// WEB3 CONFIG
const web3 = new Web3(new HDWalletProvider({privateKeys: [process.env.PRIVATE_KEY], providerOrUrl: process.env.RPC_URL}))

const CONTRACT_ADDRESS = ""; // Contract Address here ;
const CONTRACT_ABI = "";// Contract ABI here
const RouletteContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
const account = process.env.ACCOUNT;

const MIN_DEPOSIT = 1000000000;

var randomBytes;
var randomNumber;
var outputHash;
var scriptRunning;
var casinoDeposit;


async function depositMoney(depositAmount) {
  console.log("depositing " + depositAmount + "...") 
  // Should depsoit money to make casino deposit 1 ether
  await RouletteContract.methods.depositMoney().send({ from: account, value: web3.utils.toWei(web3.utils.toBN(depositAmount), 'wei') }).then(
    () => console.log("Deposit Complete")
  );
}

async function generateHash() {
  // Generate Random Number
  randomNumber = (web3.utils.toBN(web3.utils.randomHex(32)))% 38;
  // Generate Random Hash
  randomBytes = web3.utils.randomHex(32);
  // Hash together
  outputHash = web3.utils.soliditySha3(randomNumber, randomBytes);
  console.log("Sending outcome hash...");
  await RouletteContract.methods.setCommitHash(outputHash).send({ from: account }).then(
    data => console.log("output hash: " + outputHash)
  )
}

async function revealWinningNumber() {
  console.log("Revealing winning number...");
  // Send winning number and hash
  await RouletteContract.methods.revealWinningNumber(randomNumber, randomBytes).send({from : account}).then(
    data => {
      RouletteContract.methods.WinningNumber().call().then(
        data => console.log(data)
      )
    }

  )
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function resetContract() {
  // Run reset function in smart contract
  console.log("Resetting contract");
  await RouletteContract.methods.gameReset().send({ from: account }).then(
    () => console.log("contract reset")
  )
}

async function runScript() {

  if (scriptRunning){
    return;
  }

  console.log("Running Script")
  scriptRunning = true;
  
  try{

  // Get Deposit Value
  await RouletteContract.methods.getCasinoDeposit().call().then(
    data => {
      casinoDeposit = data;
      console.log(data);
    }
  )
  // If too low deposit money
  if(casinoDeposit < MIN_DEPOSIT){
    let depositAmount = MIN_DEPOSIT - casinoDeposit;
    await depositMoney(depositAmount);
  }

  // Create Casino Hash
  generateHash();

  await sleep(120000); // Betting period is two minutes

  // Wait until betting is complete and reveal winning number
  revealWinningNumber();
  await sleep(30000); // Wait 30 seconds

  // After revealing the number reset the contract
  resetContract();
  await sleep(30000); // Wait 30 seconds

} catch (error) {
  console.error(error)
  scriptRunning = false
  clearInterval(script)
  return
}

  scriptRunning = false;
}

// runs script every n seconds
const POLLING_INTERVAL = 10000 // 10 seconds
script = setInterval(async () => { await runScript() }, POLLING_INTERVAL)
