import React, { Component } from "react";
import logo from './Rou-logo-white.png';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
  
const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
            );
        }
};
  
const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};
  
const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    
    handleRegister(e) {
        e.preventDefault();
    
        this.setState({
            message: "",
            successful: false
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
    
                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }
    

    render() {
        return (
            <div className="signup">
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/landing"}> <img className="logo" src={logo} alt="Logo" /></Link>
                    </div>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner" style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>
                        
                        <Form
                            onSubmit={this.handleRegister}
                            ref={c => {
                            this.form = c;
                            }}
                        >

                            <div className="login-sign-up-nav">
                                <Link className="nav-link current" to={"/sign-up"}>Sign up</Link>
                                <Link className="nav-link" to={"/login"}>Login</Link>
                            </div>

                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            validations={[required, vusername]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Input
                                            label="Email" 
                                            // type="email" 
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            validations={[required, email]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Input
                                            label="Password" 
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            validations={[required, vpassword]}
                                        />
                                    </div>

                                    <br></br>

                                    <div className="form-group">
                                        <Button className="btn btn-primary btn-danger btn-block">Sign Up</Button>
                                    </div>
                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>
                            )}

                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                
                    </div>
                </div>
            </div>
        );
    }
}