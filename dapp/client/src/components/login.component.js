import React, { Component } from "react";
import logo from './Rou-logo-white.png';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }
   
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    
    handleLogin(e) {
        e.preventDefault();
    
        this.setState({
            message: "",
            loading: true
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(() => {
                this.props.history.push("/main");
                window.location.reload();
                },
                error => {
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
    
                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }
      
    render() {
        return (
            <div className="login" >
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/landing"}> <img className="logo" src={logo} alt="Logo" /></Link>
                    </div>
                </nav>
                <div className="auth-wrapper" >
                    <div className="auth-inner" style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>      
                    
                        <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                                this.form = c;
                            }}
                        >

                            <div className="login-sign-up-nav">
                                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                <Link className="nav-link current" to={"/login"}>Login</Link>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    label="Username" 
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    label="Password" 
                                    type="password"
                                    error 
                                    id="standard-error-helper-text" 
                                    // defaultValue="Hello World"
                                    // helperText="Incorrect password."
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required]}
                                />
                            </div>
                            
                            <br></br>

                            <div className="form-group">
                                <Button
                                    className="btn btn-primary btn-block btn-danger"
                                    disabled={this.state.loading}
                                >
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </Button>
                            </div>

                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
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
