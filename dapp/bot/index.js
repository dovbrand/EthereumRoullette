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

const CONTRACT_ADDRESS = "0x5bBFCE7124f5C97b1556Fa2718086ECf3E5bA3d4";
const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "commitHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [],
    "name": "depositMoney",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCasinoDeposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_outcomeHash",
        "type": "bytes32"
      }
    ],
    "name": "getOutcomeHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[][]",
        "name": "_bets",
        "type": "uint256[][]"
      }
    ],
    "name": "placeBet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_winningNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_nonce",
        "type": "bytes32"
      }
    ],
    "name": "revealWinningNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WinningNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "seeBets",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "numbers",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "multiplier",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "betAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Roulette.Bet[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "seePlayerWinnings",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gameReset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "removeBet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
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
  await RouletteContract.methods.getOutcomeHash(outputHash).send({ from: account }).then(
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
  await generateHash();

  await sleep(10000); // Betting period is two minutes

  // Wait until betting is complete and reveal winning number
  await revealWinningNumber();

  // After revealing the number reset the contract
  await resetContract();

} catch (error) {
  console.error(error)
  scriptRunning = false
  clearInterval(script)
  return
}

  scriptRunning = false;
}

// runs script every n seconds
const POLLING_INTERVAL = 10000 // 3 minutes
script = setInterval(async () => { await runScript() }, POLLING_INTERVAL)