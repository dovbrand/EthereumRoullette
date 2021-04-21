import React, { Component, useState } from 'react';
import MenuItems from './MenuItems'
import './Navbar.css'
import logo from './Navbarpics/Rou-logo-white.png'
import image1 from './Navbarpics/how-to-icon.png'
import image2 from './Navbarpics/rankings-icon.png'
import image3 from './Navbarpics/account-icon.png'
import image4 from './Navbarpics/logout-icon.png' 
import {IconContext} from 'react-icons/lib'

const Navbar = (props) =>{
   

    const [clicked, setClicked] = useState(false);
    
    const handleClick = () =>{
        //basically you set click to the oppsoite value whenever you click it
        setClicked(!clicked)
    }
   
    
        return(
            <IconContext.Provider value={{color: '#fff'}}>
            <nav className="NavbarItems">
                <img alt=" " src={logo} className="navbar-logo"></img>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 
                    'fas fa-bars'}></i>

                </div>
                
                <ul className={clicked ? 'nav-menu active' : 
                    'nav-menu'}>
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
                        <li>
                            <a className ="nav-links"  >
                            <img className="navbar-logos" alt=" "src={image3}></img>
                            Account
                            </a>
                        </li>
                        <li>
                            <a className ="nav-links"  >
                            <img className="navbar-logos" alt=" "src={image4}></img>
                            Logout
                            </a>
                        </li>
                    
                   
                </ul>
            </nav>
            </IconContext.Provider>


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