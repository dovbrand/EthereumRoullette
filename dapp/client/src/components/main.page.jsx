import React, {useState} from "react";
import logo from './Rou-logo-white.png';
import wheel from './Roulette-wheel-icon.png';
import Board from './board'
import { Link } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import HowtoModal from './HowtoModal';
import RankingsModal from './RankingsModal';
import Wheeel from './Wheeel';
import './board.css'
const MainPage = () => {
    const [showHowToModal, setShowHowToModal]=useState(false)
  
 const openHowtoModal = () =>{
    setShowHowToModal(!showHowToModal)
}

const [modalIsOpen, setModalIsOpen]= useState(false);
const toggleModal = () =>{
    setModalIsOpen(!modalIsOpen)
}
    return (
        <div className="main">
           
          
            <div className="auth-wrapper">
            <Navbar click ={openHowtoModal} click2={toggleModal} />
                {(modalIsOpen == true)?<HowtoModal click ={toggleModal}/>:null}
            {(showHowToModal == true)?<RankingsModal click ={openHowtoModal}/>:null}
            <div className="auth-inner-2" style={{position: 'absolute', left: '50%', top: '57%',transform: 'translate(-50%, -50%)'}}>
        
                <div className="d-flex flex-col">
                <div className="spin flex-row">
                    <Wheeel/>
                    
                    <div className="btn-spin">
                        <button className="btn btn-danger btn-block">Spin</button>
                    </div>
                </div>
                <div className="bet-table flex-row">
                    <Board/>
                </div>
                </div>

            </div>
            </div>
        </div> 
    );
};
export default MainPage;