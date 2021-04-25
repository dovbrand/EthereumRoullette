import React, { Component } from 'react';
import logo from '../images/logo-rectangle.png';
import { Link } from "react-router-dom";

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
                        <small className="text-secondary">
                            <small id="account"> 
                                <Link to={"/profile"} className="nav-link">
                                {this.props.account}
                                </Link>
                            </small>
                        </small>
                    </li>
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
        );
    }
}   
