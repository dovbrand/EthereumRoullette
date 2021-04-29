import React, { Component } from "react";
import '../index.css';
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import Navbar from './Navbar';

export default class Profile extends Component {
  async componentWillMount() {
    await this.loadBlockchainData()
  }

  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      account: '',
    };

  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    
    return (
      
      <div className="profile">
        
        <Navbar account = {this.state.account} />  

        {(this.state.userReady) ?
        <div className="auth-wrapper">
        <div className="auth-inner-3" style={{position: 'absolute', left: '50%', top: '57%',transform: 'translate(-50%, -50%)'}}>
          <br></br>
            <h3>
              <strong>{currentUser.username}</strong>
            </h3>
            <br></br>
          <p className="user-info">
            <strong>Token:</strong>{" "}
            {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p className="user-info">
            <strong>Id:</strong>{" "}
            {currentUser.id}
          </p>
          <p className="user-info">
            <strong>Email:</strong>{" "}
            {currentUser.email}
          </p>
          <p className="user-info">
            <strong>Account:</strong>{" "}
            { this.state.account}
          </p>
        </div>
        </div>: null}
      </div>
    );
  }
}
