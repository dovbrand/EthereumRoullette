import React, {useEffect, useState} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import './App.css';
import background from './background.png';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Landing from "./components/landing.page";
import MainPage from './components/main.page';

function App() {

  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3000/signup", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    })
  }

  const login = () => {
    Axios.post("http://localhost:3000/login", {
      username: username,
      password: password,
    }).then((response) => {
      
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].username)
      }
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3000/login").then((response) => {
      console.log(response);
    })
  }, [])
  
  return (<Router>
    <div className="App" style={{ backgroundImage: `url(${background})`,
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover', 
                    minWidth: '100%', 
                    minHeight: '100%' }}>
      <div className="auth-wrapper">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path="/landing" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/main" component={MainPage} />
          </Switch>
        </div>
      <div className="registration">
        <h1>Registration</h1>
        <label>Username:</label>
        <input 
          type="text" 
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password:</label>
        <input 
          type="text" 
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button> 
      </div>

      <div className="login">
        <h1>Log in</h1>
        <input type="text" placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input type="text" placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}  
        />
        <button onClick={login}> Log in </button> 
      </div>
      <h1>{loginStatus}</h1>
    </div></Router>
  );
}

export default App;
