import React, {} from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
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


const ModalContent = styled.div`

  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  margin-top: 45px;
  text-align: center;
  
  h1{
    font-weight: 100;
    font-style: normal;  
    font-family: 'Poppins', sans-serif;
    color: #29313D;
    background-color:#F0F0EE;
  }
  p {
    background-color:white;
    
  }
  table{
    background-color:white;
  }
  tr{
    background-color:white;
  }
  td{
    background-color:white;
  }
  tbody{
    background-color:white;
  }
  div{
    background-color:white;
  }
  span{
    background-color:white;
  }
  b{
    background-color:white;  
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

  

const RankingsModal = (props) =>{
    
    /*const 
    state ={
        Players:[

            {
                imgSrc:'./user-avatar-placeholder.png',
                Name: 'Pierce Taylor',
                Score: '100'
            }

        ]
    }
  */
  return(

        <Background>
          <ModalWrapper>
             
            <ModalContent>
            <h1>Leaderboard</h1>
            <br></br>
                <div>
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-borderless">
                                <col style={{width:'10%'}}/>
                                <col style={{width:'80%'}}/>
                                <col style={{width:'10%'}}/>
                                <tbody>
                                        
                                    <tr>
                                        <td className="border-0">1</td>
                                                <td className="border=0">
                                       
                                                    <div className="d-flex">
                                                        <div className="align-self-center-pl-3">
                                                            <span className="font-weight-bold">Pierce Taylor</span>
                                                        </div>
                                                    </div>
                                                    </td>
                                        <td className="border-0">
                                            <b>100</b>
                                        </td>
                                    </tr>
                                        
                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
              
            </ModalContent>
            <CloseModalButton onClick={props.click}/>
          </ModalWrapper>
        </Background>
  );  
}




export default RankingsModal;