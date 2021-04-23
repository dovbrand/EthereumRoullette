import React, { Component, useState } from 'react';
import MenuItems from './MenuItems'
import './Navbar.css'
import { Link } from "react-router-dom";
import image1 from './Navbarpics/how-to-icon.png'
import image2 from './Navbarpics/rankings-icon.png'
import image3 from './Navbarpics/account-icon.png'
import image4 from './Navbarpics/logout-icon.png' 

import logo from '../../images/logo-rectangle.png';
import AuthService from "../../services/auth.service";

const Navbar = (props) =>{
   

    const [clicked, setClicked] = useState(false);
    
    const handleClick = () => {
        //basically you set click to the oppsoite value whenever you click it
        setClicked(!clicked)
    };

  
    const logOut = props.logOut.bind(this);        
    const currentUser = undefined;

 
    
    const user = AuthService.getCurrentUser();

    if (user) {
        this.setState({
        currentUser: user,
        });
    }


    logOut = async () => {
        AuthService.logout();
    };

    return(
        <nav className="NavbarItems">
             <Link className="navbar-brand" to={"/"}> 
                <img className="logo" src={logo} alt="Logo" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 
                'fas fa-bars'}></i>
            </div>
            
            <ul className={clicked ? 'nav-menu active' : 
                'nav-menu'}>
                {currentUser ? (
                <div className="navbar-nav ml-auto">
                    <li onClick={handleClick}>
                        <a className ="nav-links" onClick={props.click2}  >
                        <img className="navbar-logos" alt=" "src={image1}></img>
                        How to Play
                        </a>
                    </li>
                    <li onClick={handleClick}>
                        <a className ="nav-links" onClick={props.click}  >
                        <img className="navbar-logos" alt=" "src={image2}></img>
                        Rankings
                        </a>
                    </li>
                    <li className="nav-item">
                        <img className="navbar-logos" alt=" "src={image3}></img>
                        <Link to={"/profile"} className="nav-link">
                            {currentUser.username}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a href="/login" className="nav-link" onClick={this.logOut}>
                            <img className="navbar-logos" alt=" "src={image4}></img>
                            LogOut
                        </a>
                    </li>
                    
                </div>
                ) : (
                <div className="navbar-nav ml-auto">
                    
                </div>
                )}
            </ul>
        </nav>


    )
        
}

export default Navbar;



/*
 {MenuItems.map((item,index) =>{
                        /* here we are using the map function on the menuitems array
                        which allows us to perform a method on all the elements 

                        return(
                            
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                <img className="navbar-logos" alt=" "src={item.icon}></img>
                                {item.title}
                                </a>
                            </li>   
                            
                        )
                    })}
*/