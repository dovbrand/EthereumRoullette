import React, { Component } from "react";
import UserService from "../services/user.service";
import Web3 from "web3";
import RouletteContract from '../contracts/Roulette.json';
import './board.css';

import Board from './board.js'
import Navbar from './Navbar';
import Wheeel from './Wheeel';

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

export default class BoardUser extends Component {

    // loads web3 and interacts with contract
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
            // get winning number
            rou.methods.WinningNumber().call().then(
                    data => this.setState({ winningNumber: data})
                )

        } else {
            // window.alert('Roulette contract not deployed to detected network.')
        }
    }

    PlaceBet() {
        this.state.rou.methods.placeBet(this.state.bets).send({from: this.state.account})
        .on('receipt', function(){
            console.log("bet placed")
        });
    };

    async Reset() {
    }

    constructor(props) {
        super(props);

        this.state = {
            account: '',
            rou: null,
            winningNumber: 0,
            bets: [[100,1,2,3,4],[100,20],[100,1,2,3,4,5,6,7,8,9,10,11,12]], // array to keep track of bets ie. [[100,1,2,3,4],[100,20],[100,1,2,3,4,5,6,7,8,9,10,11,12]]
            totalBetAmmount: 0 // stores the bet ammount
        };
    }

    componentDidMount = async () => {
        UserService.getUserBoard().then(
        response => {
            this.setState({
            content: response.data
            });
        },
        error => {
            this.setState({
            content:
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            });
        });
    }


  render() {
    return (
        <div className="main">
            <Navbar account = {this.state.account} />  
            
            <div className="auth-wrapper">
       
            <div className="auth-inner-2" style={{position: 'absolute', left: '50%', top: '57%',transform: 'translate(-50%, -50%)'}}>
            <div className="flex-container">
            <div className="flex-child spin">
                <Wheeel winningNumber = {this.state.winningNumber}/>
            </div>
            <div className="flex-child bet-table">
                <div>
                <Board/>
                </div>
                <br></br>
                <div className="betting-action">
                    Your bets:
                    <div className="display-bets">
                        <button type="button" className="place-btn btn btn-danger btn-block" onClick={this.PlaceBet}>Place bet</button>
                        <button type="button" className="reset-btn btn btn-danger btn-block" onClick='Reset()'>Reset</button>
                        <div id='bets'></div>
                        <div id='balance'>Balance: 1.00 ETH </div>
                    </div>
                </div>
            </div>
            </div>

            </div>
        </div>
        </div> 
    );
  }
}