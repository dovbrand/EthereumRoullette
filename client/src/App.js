import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import Rankings from "./components/RankingsModal";
import HowTo from "./components/HowtoModal";

import Web3 from "web3";
import RouletteContract from './contracts/Roulette.json';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      account: '',
    };
  }

  render() {

    return (
      
      <Router>
        <div className="App" >
          <div className="auth-wrapper"> 
            <Switch>
              <Route exact path={["/", "/main"]} component={BoardUser} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/main" component={BoardUser}/>
              <Route path="/rankings" component={Rankings}/>
              <Route path="/how-to" component={HowTo}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
