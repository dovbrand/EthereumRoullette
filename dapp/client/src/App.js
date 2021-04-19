import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import { useWeb3 } from '@openzeppelin/network/react';
import Web3Data from '../../../dapp/client/src/components/Web3Data.js';

import AuthService from "./services/auth.service";

import background from './background.png';
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import MainPage from './components/main.page';
import Home from "./components/home.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

const infuraProjectId = '4f42d33ad63a41bf897a2c84029fec3e';

class App extends Component {
  //  web3Context = useWeb3(`wss://kovan.infura.io/ws/v3/${infuraProjectId}`);

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div className="App" 
          style={{ backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover', 
          minWidth: '100%', 
          minHeight: '100%' }}>
          

          {/* <Web3Data title="Web3 Data" web3Context={web3Context} /> */}
          
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Rou
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {/* {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )} */}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
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
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/signup"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>


          <div className="auth-wrapper">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/main" component={MainPage} />
              <Route path="/user" component={BoardUser} />
              {/* <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
