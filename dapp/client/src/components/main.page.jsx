import React from "react";
import logo from './Rou-logo-white.png';
import { Link } from "react-router-dom"

const MainPage = () => {
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/landing"}> <img className="logo" src={logo} alt="Logo" /></Link>
                    </div>
                </nav>
        </div> 
    );
};
export default MainPage;