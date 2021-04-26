import React, { Component } from "react";
import UserService from "../services/user.service";
import Web3 from "web3";
import RouletteContract from '../contracts/Roulette.json';

import Board from './board';
import './board.css';
import Navbar from './Navbar';
import HowtoModal from './HowtoModal';
import RankingsModal from './RankingsModal';
import Wheeel from './Wheeel';


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
            const rou = new web3.eth.Contract(RouletteContract.abi, networkData.address)
            this.setState({ rou})
            this.setState({ loading: false})
        } else {
            window.alert('Roulette contract not deployed to detected network.')
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            account: ''
        
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


  render() {
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
                <Board/>
                </div>
                <br></br>
                <div className="betting-action">
                Your bets:
                        <div className="display-bets">
                            <button type="button" className="place-btn btn btn-danger btn-block" onClick='Place()'>Place bet</button>
                            <button type="button" className="reset-btn btn btn-danger btn-block" onClick='Reset()'>Reset</button>
                            <div id='bets'></div>
                            <div id='balance'>Balance: 1.00 ETH</div>
                            <div id='result'></div>
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