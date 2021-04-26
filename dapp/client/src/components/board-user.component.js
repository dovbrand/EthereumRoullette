import React, { Component } from "react";
import UserService from "../services/user.service";
import Web3 from "web3";
import RouletteContract from '../contracts/Roulette.json';

import Board from './board.js'
import './board.css'
import Navbar from './Navbar';
import Wheeel from './Wheeel';


export default class BoardUser extends Component {

    // loads web3 and interacts with contract
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
        await this.placeBet()
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
            const rou = new web3.eth.Contract(RouletteContract.abi, networkData.address)
            this.setState({ rou })
            this.setState({ loading: false})
        } else {
            window.alert('Roulette contract not deployed to detected network.')
        }
    }

    async placeBet() {
        await this.state.rou.methods.placeBet().send()
    }

    constructor(props) {
        super(props);

        this.state = {
            account: '',
            rou: null,
            bets: [],
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
        }
        );
    }

    state = {
        minutes: 2,
        seconds: 0,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }


  render() {
    const { minutes, seconds } = this.state
    return (
        <div className="main">
            <Navbar account = {this.state.account} />  
            
            <div className="auth-wrapper">
       
            <div className="auth-inner-2" style={{position: 'absolute', left: '50%', top: '57%',transform: 'translate(-50%, -50%)'}}>
            <div className="flex-container">
            <div className="flex-child spin">
                <Wheeel/>
            </div>
            <div className="flex-child bet-table">
                <div>
                    { minutes === 0 && seconds === 0
                        ? <h1 className="time">Time's up!</h1>
                        : <h1 className="time">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                    }
                </div>
                <div>
                    <Board/>
                </div>
                <div className="betting-action flex-container">
                    <div className=" display-bets">
                        <strong>Your bets:</strong>
                        <div className="bets overflow-scroll" id='bets'></div>
                        <div id='balance'><strong>Balance:</strong> 1.00 ETH</div>
                        <div id='result'></div>
                    </div>
                    <div>
                        <button type="button" className="reset-btn btn btn-danger btn-block" onClick='Reset()'>Reset</button>
                        <button type="button" className="place-btn btn btn-danger btn-block" onClick='Place()'>Place bet</button>
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