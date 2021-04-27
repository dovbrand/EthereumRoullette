import {React, useState}  from 'react'
import { Wheel } from 'react-custom-roulette'
import './Wheeel.css'

import Web3 from 'web3';
import { ROU_ABI, ROU_ADDRESS } from '../config'

const data = [
    { option: '32' },
    { option: '15' },
    { option: '19'},
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
    { option: '0', style: { backgroundColor: '#F0F0EE', textColor: '#29313D'}  },
    
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

const web3 = new Web3(Web3.givenProvider);
const rou = new web3.eth.Contract(ROU_ABI, ROU_ADDRESS)

export default function Wheeel (){
  
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [perpendicularText, setperpendicularText] = useState(true);

 
  const handleSpinClick = () => {
    rou.methods.WinningNumber().call()
    .then(function(result){
      var WinningNumber = result;
      var PrizeNumberIndex = 0;

      for(var i=0; i<data.length; i++){
        if (WinningNumber === data[i].option)
          PrizeNumberIndex = i;
      }
      setPrizeNumber(PrizeNumberIndex);
      
      console.log("Winning Number is: " + WinningNumber)
      setMustSpin(true)
    });
  }

  return (
    <div className='wheel'>
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
      <button className={'spin-button btn btn-danger btn-block'} onClick={handleSpinClick}>
        Spin
      </button>
    </div>
  );
};