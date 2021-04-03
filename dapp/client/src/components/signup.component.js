import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import logo from './Rou-logo-white.png';
import { Link } from "react-router-dom";

export default class SignUp extends Component {
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
                    <form>
                        <div className="login-sign-up-nav">
                            <Link className="nav-link current" to={"/sign-up"}>Sign up</Link>
                            <Link className="nav-link" to={"/login"}>Login</Link>
                        </div>

                        <div className="form-group">
                            <TextField label="First name" type="text" fullWidth/>
                        </div>

                        <div className="form-group">
                            <TextField label="Last name" type="text" fullWidth/>
                        </div>

                        <div className="form-group">
                            <TextField label="Email" type="email" fullWidth/>
                        </div>

                        <div className="form-group">
                            <TextField label="Username" type="text" fullWidth/>
                        </div>

                        <div className="form-group">
                            <TextField label="Password" type="password" fullWidth/>
                        </div>

                        <br></br>

                        <Link className="btn btn-danger btn-block" to={"/main"}>Sign up</Link>
                        <p className="forgot-password text-right">
                            Already registered? <Link to={"/login"}>Login</Link>
                        </p>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}