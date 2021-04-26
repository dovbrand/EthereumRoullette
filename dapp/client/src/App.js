import React, {useEffect, useState, Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import Rankings from "./components/RankingsModal";
import HowTo from "./components/HowtoModal";

import Web3 from "web3";
import RouletteContract from './contracts/Roulette.json';

const CONTRACT_ADDRESS = "0x1649c20987a6599fBd0a119E82035691a42A6369";
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
    "inputs": [],
    "name": "depositMoney",
    "outputs": [],
    "stateMutability": "payable",
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
    "inputs": [],
    "name": "getCommitmentHash",
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
    "name": "getGameState",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
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
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "removeBet",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "internalType": "struct Roullette.Bet[]",
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
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_outcomeHash",
        "type": "bytes32"
      }
    ],
    "name": "setCommitmentHash",
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
    "stateMutability": "payable",
    "type": "receive"
  }
];

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentUserProvider)
    }
    else {
      window.alert('non-Ethereum browser detected.')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0]})
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = RouletteContract.networks[networkId]

    if(networkData) {
      // const rou = new web3.eth.Contract(RouletteContract.abi, networkData.address)
      const rou = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
      this.setState({ rou })
      this.setState({ loading: false})
    } else {
      window.alert('Roulette contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props);
    
    this.state = {
      account: '',
      rou: null,
      betArray: [],
      valueBet: 0,
      loading: true
    };
  }

  render() {

    return (
    
      <Router>
        <div className="App" >
          <div className="auth-wrapper"> 
            <Switch>
              <Route exact path={["/", "/main"]} component={BoardUser} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/main" component={BoardUser}/>
              <Route path="/rankings" component={Rankings}/>
              <Route path="/how-to" component={HowTo}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
