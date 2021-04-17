import React, { Component } from "react";
import logo from './Rou-logo-white.png';
import { Link } from "react-router-dom"
import AuthService from "../services/auth.service";

// import Web3Data from '/Web3Data.js';

export default class Main extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }
  
    render() {
        const { currentUser } = this.state;
  
        return (
                
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>Id:</strong>{" "}
                    {currentUser.id}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        );
    }
}