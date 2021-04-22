import React, {useEffect, useState, Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import logo from './images/logo-rectangle.png';

import AuthService from "./services/auth.service";

import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import Main from "./components/main.page.jsx";

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
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      account: '',
      rou: null,
      betArray: [],
      valueBet: 0,
      loading: true
    };
  }

  componentDidMount = async () => {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

  };

  logOut() {
    AuthService.logout();
  }

  render() {

    const { currentUser } = this.state;

    return (
      <div
        className="App" style={{ backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover', 
        overflow: 'hidden',
        width: '100vw',
        height: '100vh'}}
      >
        <nav className="navbar navbar-expand navbar-dark ">
          <Link className="navbar-brand" to={"/"}> 
            <img className="logo" src={logo} alt="Logo" />
          </Link>

          <div className="navbar-nav mr-auto">

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                { this.state.account}
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              
            </div>
          )}
        </nav>

            {/* {this.state.loading
              ?<div id="loader" className="text-center mt-5"><p>Loading...</p></div>
              :<Main
              />
            } */}

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/user" component={BoardUser}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
