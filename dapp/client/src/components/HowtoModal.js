import React, {useState} from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import image5 from './roulette-image.jpg';
import image6 from './roulette-gif.gif';
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
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  
`;
const ModalImg = styled.img`
  width: 200px;
  height: 200px;
  float: left;
  border-radius: 50%;
 

  
`; 

const ModalWrapper = styled.div`
  width: 1000px;
  height: 700px;
 
  position: relative;
  z-index: 10;
  border-radius: 20px;
  background-color:#F0F0EE;
  mix-blend-mode: normal;

`;


const ModalImg1 = styled.img`
  width: 300px;
  height: 100px;
  border-radius: 0px 160px 0px 30px;

 

  
`; 

const ModalContent = styled.div`
  
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
line-height: 1.8;
color: black;

background-color:#F0F0EE;
  h1{
    background-color:#F0F0EE;
  }
  p {
    width: 500px;
    margin-bottom: 1rem;
    background-color:#F0F0EE;
    
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
              <ModalImg src={image5}/>
    <h1>How to Play </h1>
    <p>Roulette bets are divided in two main categories: inside and outside bets. 
        If you take a better look at the roulette table layout, 
        you’ll notice that the main part consists of the numbers from 00, 0 - 36 and 
        the rest are sectors for betting on groups of numbers: odd/even, red/black, 1-18/19-36, columns and dozens.
        The bets that you place on the numbers themselves are called inside bets, 
        whereas the bets that you place on the other sectors are called outside bets</p>
              </ModalContent>
              </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                <ModalContent>
                <h1>Inside Bets</h1>
        <p>
            <ul>
                <li>Straight- This is a bet that covers only one number. Inorder to make this bet, place the chip inside the square of the number.</li>
                <li>Split- A bet on two numbers adjacent on the table, made by placing the chip on the shared line of the two squared numbers.</li>
                <li>Street - A bet on two adjacent lines. Inorder to make this bet, you have to place the chip on the common outer corner of the two lines </li>
                <li>Corner-  This is a four-number bet placed by putting the chip on the common corner of the four numbers, Also called square bet. </li>
                <li>Trio-  A three number bet that includes the zero or the zeros. Place the chip on the line shared by the zero box and the two other numbers</li>
                <li>Basket-  Bet on 0, 1, 2, 3, with a chip on the corner shared by the zero box and the first line. In American roulette it includes a double zero.</li>
            </ul>
        </p>
        <ModalImg1 src={image6}/>
              </ModalContent>
              </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
              <ModalContent>
              <h1>Outside Bets</h1>
        <p>*Bets that are placed outside the number field, on the sectors that cover the bigger groups of numbers. There are five common types outside bets:</p>
        <p>
            <ul>
                <li>Red or Black – Bet on the colour of the winning number</li>
                <li>Odd or Even – Bet on whether the winning number will be odd or even</li>
                <li>1 to 18 or 19 to 36 – Bet on whether the winning number will be low (lower than 19) or high</li>
                <li>Dozens – Bet on one of the three dozen that are found on the layout of the table </li>
                <li>Columns – Bet from which of the three columns will the winning number be</li>
                
            </ul>
        </p>
                </ModalContent>
                </div>
              </SwiperSlide>
            </Swiper>
            <CloseModalButton onClick={props.click}/>
          </ModalWrapper>
</Background>
    )
}




export default HowtoModal;