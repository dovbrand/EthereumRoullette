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

import background from './images/background.png';
import Web3 from "web3";
import RouletteContract from './contracts/Roulette.json';

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
              <Route exact path={["/", "/home"]} component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/main" component={BoardUser}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
