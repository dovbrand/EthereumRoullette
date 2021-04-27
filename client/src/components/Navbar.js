import React, { Component } from 'react';
import logo from '../images/logo-rectangle.png';
import logout from '../images/logout-icon.png';
import { Link } from "react-router-dom";
import './Navbar.css';
import account from '../images/account-icon.png';
import rankings from '../images/rankings-icon.png';
import howto from '../images/how-to-icon.png';

import AuthService from "../services/auth.service";

export default class  Navbar extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
            currentUser: undefined,
        };
    }
    
    componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
            this.setState({
                currentUser: user
            });
        }
    }
    
    logOut() {
        AuthService.logout();
    }

    render() {

        const { currentUser } = this.state;

        return (
            <nav className="navbar navbar-expand ">
                <Link className="navbar-brand" to={"/"}> 
                    <img className="logo" src={logo} alt="Logo" />
                </Link>

                {currentUser ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/how-to"} className="nav-link">
                        <img className="how-to-img" src={howto} alt="How to Play"></img>
                        How to Play
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/rankings"} className="nav-link">
                        <img className="rankings-img" src={rankings} alt="Rankings"></img>
                        Rankings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/profile"} className="nav-link">
                        <img className="account-img" src={account} alt="Account"/>
                            {currentUser.username}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="/login" className="nav-link" onClick={this.logOut}>
                        <img className="logout-img" src={logout} alt="Logout"/>
                        Logout
                        </a>
                    </li>
                    
                </div>
                ) : (
                <div className="navbar-nav ml-auto">
                    
                </div>
                )}
            </nav> 
        );
    }
}   
