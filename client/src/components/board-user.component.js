import React, { Component } from "react";
import UserService from "../services/user.service";
import Web3 from "web3";

import Board from './board.js'
import './board.css'
import Navbar from './Navbar';
import Wheeel from './Wheeel';

import { ROU_ABI, ROU_ADDRESS } from '../config'

export default class BoardUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            rou: null,
            playerBalance: 0,
            getBetCloseRunning: false,
            getBetOpenRunning: true,
            lastBlock: 0,
            spinWheel: false,
            gameState: ''
        };

        this.PlaceBet = this.PlaceBet.bind(this);
        this.getBettingClosed = this.getBettingClosed.bind(this);
        this.getBettingOpen = this.getBettingOpen.bind(this);      
        this.getGameState = this.getGameState.bind(this);    
        this.Verify = this.Verify.bind(this);    
    }

    // loads web3 and interacts with contract
    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
        await this.getBettingClosed()
        await this.getGameState()

    }

    componentDidMount = async () => {
        this.updateTimer = setInterval(() => this.getGameState(), 30000);
       
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
        console.log("Metamask Accoount loaded: " + accounts)
        this.setState({ account: accounts[0]})
        // Getting the account balance
        let balance = await web3.eth.getBalance(accounts[0]);
        let balanceth = await web3.utils.fromWei(balance,'ether');
        console.log("Your Balance is: " + balanceth)
        this.setState({ balance: balanceth})
        // connects with connected contract
        const rou = new web3.eth.Contract(ROU_ABI, ROU_ADDRESS)
        this.setState({ rou })
        this.setState({ loading: false})
        console.log(rou)
    }

    async PlaceBet() {
        var betArray = window.BETS_ARRAY;
        var betAmount = window.BETS_TOTAL;
        console.log(betArray)
        console.log("TOTAL AMOUNT BET: " + betAmount)
        this.state.rou.methods.placeBet(betArray).send({from: this.state.account, value: betAmount})
            .then(function(receipt){
                console.log(receipt);
            });
        window.Reset();
        this.btn.setAttribute("disabled", "disabled");
    };

    async getBettingClosed() {
        // this.getGameState();
        if (this.state.getBetCloseRunning === false) {
            // this.timerUpdate();
            this.setState({ getBetCloseRunning: true})
            console.log("Get Betting Close Event")
            this.state.rou.once('bettingPhaseClosed', { fromBlock: this.state.lastBlock },
                (error, event) =>{
                    console.log(event);
                    this.setState({lastBlock: event.blockNumber})
                    this.btn.setAttribute("disabled", "disabled"); // placebet button disables
                    this.setState({getBetOpenRunning: false})
                    this.setState({spinWheel: true})
                    this.getBettingOpen();
            });
        }
    }

    async getBettingOpen() {
        this.setState({spinWheel: false})
        // this.getGameState();

        if (this.state.getBetOpenRunning === false) {
            // this.timerUpdate()
            this.setState({ getBetOpenRunning: true})
            console.log("Get Betting Open Event")
            this.state.rou.once('bettingPhaseOpen', { fromBlock: this.state.lastBlock },
                (error, event) => {
                    console.log(event);
                    this.setState({lastBlock: event.blockNumber})
                    this.btn.removeAttribute("disabled"); // placebet button renables
                    this.setState({getBetCloseRunning: false})
                    this.getBettingClosed();
            });
        }
    }

    async  getGameState() {
        await this.state.rou.methods.getGameState().call().then(
            data => {
                this.setState({gameState: data});
            }
        );
    }

    async Verify() {
        await this.state.rou.methods.getLastGameResults().call().then(
            data => {
               alert("To verify the winning number, hash together the last winning number and the last random hash using SHA3 or KECCAK256. The result should match the last commit hash." +
                    "\nWon? " + data[0] + 
                    "\nAmount won/lost:  " + data[1] + 
                    "\nLast Winning Number: "+ data[2] + 
                    "\nLast Random Hash: "+ data[3] +
                    "\nLast Commit Hash: "+ data[4]);
               console.log(data)
            }
        );
    }

    render() {
        var gamePhaseMsg = this.state.gameState
        if (gamePhaseMsg === 'resetPhase'){
            this.btn.setAttribute("disabled", "disabled");
            gamePhaseMsg = 'Game resetting, please wait...'
        } 
        else if (gamePhaseMsg === 'bettingPhase') {
            gamePhaseMsg = 'You have 1 minute to place your bets'
            this.btn.removeAttribute("disabled");
        }
        else if (gamePhaseMsg === 'payingPhase') {
            this.btn.setAttribute("disabled", "disabled");
            gamePhaseMsg = 'Revealing the winning number, a new game will start soon...'
        } 
        else {
            gamePhaseMsg = 'Please wait...'
        
        };

        return (
            <div className="main">
                <Navbar account = {this.state.account} /*balance = {this.state.balance}*/ />  
                <div className="auth-wrapper">
                    <div className="content">
                        <div className="auth-inner-2" style={{position: 'fixed', left: '50%', top: '57%',transform: 'translate(-50%, -50%)'}}>
                            <div className="flex-container">
                                <div className="flex-child spin">
                                    <Wheeel spinWheel={this.state.spinWheel}/>
                                </div>
                                <div className="flex-child bet-table">
                                    <div className="bet-status" id='timer'>
                                        <h3>{gamePhaseMsg}</h3>
                                    </div>
                                    <div>
                                        <Board/>
                                    </div>
                                    <div className="betting-action flex-container">
                                        <div className=" display-bets">
                                            <strong>Your bets:</strong>
                                            <div className="bets overflow-scroll" id='bets'></div>
                                            <div id='balance'><strong>Balance:</strong> {this.state.balance} ETH</div>
                                            <div id='totalBet'><strong>Total Bet:</strong> 0.00 ETH</div>
                                            <div id='result'></div>
                                        </div>
                                        <div>
                                            <button className="place-btn btn btn-danger btn-block" ref={btn => { this.btn = btn; }} onClick={this.PlaceBet}>Place bet</button>
                                            <button className="reset-btn btn btn-danger btn-block" onClick={window.Reset}>Clear Bets</button>
                                            <button className="place-btn btn btn-danger btn-block" onClick={this.Verify}>Verify Result</button>
                                        </div>
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