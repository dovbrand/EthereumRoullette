import { React, useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import './Wheeel.css'

import Web3 from 'web3';
import { ROU_ABI, ROU_ADDRESS } from '../config'
import BoardUser from './board-user.component';
import board from './board';

const data = [
  { option: '32' },
  { option: '15' },
  { option: '19' },
  { option: '4' },
  { option: '21' },
  { option: '2' },
  { option: '25' },
  { option: '17' },
  { option: '34' },
  { option: '6' },
  { option: '27' },
  { option: '13' },
  { option: '36' },
  { option: '11' },
  { option: '30' },
  { option: '8' },
  { option: '23' },
  { option: '10' },
  { option: '5' },
  { option: '24' },
  { option: '16' },
  { option: '33' },
  { option: '1' },
  { option: '20' },
  { option: '14' },
  { option: '31' },
  { option: '9' },
  { option: '22' },
  { option: '18' },
  { option: '29' },
  { option: '7' },
  { option: '28' },
  { option: '12' },
  { option: '35' },
  { option: '3' },
  { option: '26' },
  { option: '0', style: { backgroundColor: '#F0F0EE', textColor: '#29313D' } },

];

const backgroundColors = ['#A91607', '#3a4353'];
const textColors = ['#F0F0EE'];
const outerBorderColor = '#29313D';
const outerBorderWidth = 7;
const innerBorderColor = '#29313D';
const innerBorderWidth = 20;
const innerRadius = 60;
const radiusLineColor = '#29313D';
const radiusLineWidth = 3;
const fontSize = 16;
const textDistance = 85;

// Connectes with contract
const web3 = new Web3(Web3.givenProvider);
const rou = new web3.eth.Contract(ROU_ABI, ROU_ADDRESS);

export default function Wheeel(props) {

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [perpendicularText] = useState(true);
  const [winnerNum, setWinNum] = useState(0);
  
  function handleSpinClick() {
    var PrizeNumber = 0;
    var PrizeNumberIndex = 0;
  
    rou.methods.WinningNumber().call().then(
      resp => {
        PrizeNumber = resp;
        setWinNum(PrizeNumber)
        console.log("Winning Number is: " + resp)
        for (var i = 0; i < data.length; i++) {
          if (PrizeNumber === data[i].option)
            PrizeNumberIndex = i;
        }
        setPrizeNumber(PrizeNumberIndex);
        setMustSpin(true);
      }
    )
    window.Reset();
  }

  function checkResult(winNum){
    var bets = window.BETS_ARRAY;

    if (bets === null) {
      alert("You Did Not Bet!")
    } else {
      for (var i = 0; i < bets.length; i++) {
        for (var x = 0; x < bets[i].length; x++) {
          console.log(bets[i][x]);
          if (winNum === bets[i][x]) {
            alert("You Won!");
            break;
          }
        }
      }
      alert("You Lost!")
    }
  }

  if (props.spinWheel === true) {
    console.log(props.spinWheel)
    handleSpinClick();
    setTimeout(() => { checkResult(winnerNum);}, 15000);
  }

  return (
    
    <div className='wheel'>
      <div className='wheel win-msg-container'>
        {mustSpin === false ? <h3 className="win-msg">{winnerNum}</h3> : <h3 className="win-msg"> </h3> }
      </div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={backgroundColors}
        textColors={textColors}
        fontSize={fontSize}
        outerBorderColor={outerBorderColor}
        outerBorderWidth={outerBorderWidth}
        innerRadius={innerRadius}
        innerBorderColor={innerBorderColor}
        innerBorderWidth={innerBorderWidth}
        radiusLineColor={radiusLineColor}
        radiusLineWidth={radiusLineWidth}
        perpendicularText={perpendicularText}
        textDistance={textDistance}


        onStopSpinning={() => {
          setMustSpin(false)
        }}
      />
    </div>
  );
};