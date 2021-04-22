import {React, useState}  from 'react'
import { Wheel } from 'react-custom-roulette'
import './Wheeel.css'


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
    { option: '0', style: { backgroundColor: 'green'}  },
    
  ];
  
  const backgroundColors = ['#CC0000', 'black'];
  const textColors = ['white'];
  const outerBorderColor = '#FFCC33';
  const outerBorderWidth = 10;
  const innerBorderColor = 'black';
  const innerBorderWidth = 30;
  const innerRadius = 35;
  const radiusLineColor = '#FFCC33';
  const radiusLineWidth = 2;
  const fontSize = 15;
  const textDistance = 75;
  
  
  const Wheeel = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [perpendicularText, setperpendicularText] = useState(true);
    const handleSpinClick = () => {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  
    return (
      <div className='wheel'>
           <button className={'spin-button'} onClick={handleSpinClick}>
            SPIN
          </button>
       
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
export default Wheeel
