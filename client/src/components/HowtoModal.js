import React, {} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import logov2 from '../images/logo-v2.png';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
// install Swiper modules
SwiperCore.use([Navigation, Pagination]);





/*
const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  background-color: white;

`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  background-color:white;
  
  
  h1{
    background-color:white;
    
  }
  p {
    width: 500px;
    margin-bottom: 1rem;
    background-color:white;
    
    
  }
  li{
    background-color:white;
  }
  `;

  const ModalWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  
  
  
  

`;

const ModalImg = styled.img`
  width: 300px;
  height: 300px;
  float: left;
  border-radius: 50%;
 

  
`; 
const ModalImg1 = styled.img`
  width: 500px;
  height: 300px;
  border-radius: 0px 160px 0px 30px;

 

  
`; 
const Column1Wrapper = styled.div`

width: 200px;
length: 200px;
background: url(${image5});
float: left;
shape-outside: circle;





`;
*/

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: #29313D;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  
`;
const ModalImg = styled.img`
  width: 150px;
  height: 150px;
  float: left;
 

  
`; 

const ModalWrapper = styled.div`
  width: 900px;
  height: 540px;
 
  position: relative;
  z-index: 10;
  border-radius: 20px;
  background-color:#F0F0EE;
  mix-blend-mode: normal;

`;

const ModalContent = styled.div`
  
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
line-height: 1.5;
margin-top: 45px;

background-color:#F0F0EE;
  h1{
    font-weight: 100;
    font-style: normal;  
    font-family: 'Poppins', sans-serif;
    color: #29313D;
    background-color:#F0F0EE;
  }
  p {
    width: 730px;
    background-color:#F0F0EE;
    font-weight: 100;
    font-style: normal;  
    font-family: 'Poppins', sans-serif;
    color: #29313D;
    font-size: 17px;
    
  }
  li{
    background-color:#F0F0EE;
  }
  ul{
    background-color:#F0F0EE;
  }
  div{
    background-color:#F0F0EE;
   
  }


  
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  background-color: #F0F0EE;`
  

  

const HowtoModal = (props) =>{


    return(
<Background>
          <ModalWrapper>
             
            <Swiper
            navigation
            pagination={{clickable:true}}
            > 
              <SwiperSlide>
                <div>
              <ModalContent>
              <ModalImg src={logov2}/>
    <h1>How to Play </h1>
    <p>Roulette bets are divided in two main categories: <strong>inside</strong> and <strong>outside</strong> bets.
        If you take a better look at the roulette table layout, 
        you’ll notice that the main part consists of the numbers <strong>0 - 36</strong>.  
        The rest are sectors for betting on groups of numbers like: 
        <ul>
          <li><strong>odd or even numbers</strong></li> 
          <li><strong>red or black numbers</strong></li>
          <li><strong>numbers 1-18 or 19-36</strong></li>
          <li><strong>columns and/or dozens</strong></li>
        </ul>
        The bets that you place on the numbers themselves are called <strong>inside bets</strong>, 
        whereas the bets that you place on the other sectors are called <strong>outside bets</strong>.</p>
              </ModalContent>
              <br></br>
              </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                <ModalContent>
                <h1>Inside Bets</h1>
                <br></br>
        <p>
            <ul>
                <li><strong>Straight:</strong> This is a bet that covers only one number. In order to make this bet, place the chip inside the square containing the number.</li>
                <li><strong>Split:</strong> A bet on two numbers adjacent on the table made by placing the chip on the shared line of the two squares containing the numbers.</li>
                <li><strong>Street:</strong> A bet on three numbers located on the same line. In order to make this bet, you have to place the chip on the outer corner of the row. </li>
                <li><strong>Six Line:</strong> A bet on two adjacent lines. In order to make this bet, you have to place the chip on the common outer corner of the two lines. </li>
                <li><strong>Corner:</strong> This is a four-number bet made by placing the chip on the common corner of the four numbers (also called a square bet). </li>
                <li><strong>Trio:</strong> A three number bet that includes the zero. Place the chip on the line shared by the zero box and the two other numbers.</li>
                <li><strong>Basket:</strong> Bet on 0, 1, 2, 3 with a chip on the corner shared by the zero box and the first line.</li>
            </ul>
        </p>
              </ModalContent>
              <br></br>
              </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
              <ModalContent>
              <h1>Outside Bets</h1>
              <br></br>
        <p>There are <strong>five</strong> common types outside bets:</p>
        <p>
            <ul>
                <li><strong>Red or Black:</strong> Bet on whether the winning number will be red or black.</li>
                <li><strong>Odd or Even:</strong> Bet on whether the winning number will be odd or even.</li>
                <li><strong>1 to 18 or 19 to 36:</strong> Bet on whether the winning number will be low (lower than 19) or high (higher than 19).</li>
                <li><strong>Dozens:</strong> Bet on one of the three dozen groups that are found on the layout of the table.</li>
                <li><strong>Columns:</strong> Bet on which of the three columns the winning number will be from.</li>
                
            </ul>
        </p>
                </ModalContent>
                </div>
              </SwiperSlide>
            </Swiper>
            <Link to={"/main"}> 
            <CloseModalButton/>
            </Link>
          </ModalWrapper>
</Background>
    )
}




export default HowtoModal;