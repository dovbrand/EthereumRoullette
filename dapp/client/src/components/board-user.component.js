import React, { Component } from "react";
import UserService from "../services/user.service";
import getWeb3 from "../getWeb3";
import RouletteContract from '../contracts/Roulette.json';

import './board.js'
import Navbar from './Navbar/Navbar';
import HowtoModal from './HowtoModal';
import RankingsModal from './RankingsModal';
import Wheeel from './Wheeel';

export default class BoardUser extends Component {


    // const [showHowToModal, setShowHowToModal] = useState(false)
  
    // const openHowtoModal = () =>{
    //     setShowHowToModal(!showHowToModal)
    // }

    // const [modalIsOpen, setModalIsOpen]= useState(false);
    // const toggleModal = () =>{
    //     setModalIsOpen(!modalIsOpen)
    // }

    
  
  constructor(props) {
    super(props);

    this.state = {
      content: "hello world ",
      
    };
  }

  componentDidMount = async () => {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
        <div className="main">
           
            
        <div className="auth-wrapper">
        {/* <Navbar click ={openHowtoModal} click2={toggleModal} />
            {(modalIsOpen == true)?<HowtoModal click ={toggleModal}/>:null}
            {(showHowToModal == true)?<RankingsModal click ={openHowtoModal}/>:null} */}
            
        <div className="auth-inner-2" style={{position: 'absolute', left: '50%', top: '57%',transform: 'translate(-50%, -50%)'}}>
            <div className="d-flex flex-col">
            <div className="spin flex-row">
                <Wheeel/>
            </div>
            <div className="bet-table flex-row">
                <div class="roulette">
                    <table>
                        <tr class="nums">
                            <td class="num green zero" rowspan="3"><span>0</span></td>
                            <td class="num red"><span>3</span></td>
                            <td class="num black"><span>6</span></td>
                            <td class="num red"><span>9</span></td>
                            <td class="num red"><span>12</span></td>
                            <td class="num black"><span>15</span></td>
                            <td class="num red"><span>18</span></td>
                            <td class="num red"><span>21</span></td>
                            <td class="num black"><span>24</span></td>
                            <td class="num red"><span>27</span></td>
                            <td class="num red"><span>30</span></td>
                            <td class="num black"><span>33</span></td>
                            <td class="num red"><span>36</span></td>
                            <td class="sector" data-sector="1"><span class="vt">2 to 1</span></td>
                        </tr>
                        <tr class="nums">
                            <td class="hidden"></td>
                            <td class="num black"><span>2</span></td>
                            <td class="num red"><span>5</span></td>
                            <td class="num black"><span>8</span></td>
                            <td class="num black"><span>11</span></td>
                            <td class="num red"><span>14</span></td>
                            <td class="num black"><span>17</span></td>
                            <td class="num black"><span>20</span></td>
                            <td class="num red"><span>23</span></td>
                            <td class="num black"><span>26</span></td>
                            <td class="num black"><span>29</span></td>
                            <td class="num red"><span>32</span></td>
                            <td class="num black"><span>35</span></td>
                            <td class="sector" data-sector="2"><span class="vt">2 to 1</span></td>
                        </tr>
                        <tr class="nums">
                            <td class="hidden"></td>
                            <td class="num red"><span>1</span></td>
                            <td class="num black"><span>4</span></td>
                            <td class="num red"><span>7</span></td>
                            <td class="num black"><span>10</span></td>
                            <td class="num black"><span>13</span></td>
                            <td class="num red"><span>16</span></td>
                            <td class="num red"><span>19</span></td>
                            <td class="num black"><span>22</span></td>
                            <td class="num red"><span>25</span></td>
                            <td class="num black"><span>28</span></td>
                            <td class="num black"><span>31</span></td>
                            <td class="num red"><span>34</span></td>
                            <td class="sector" data-sector="3"><span class="vt">2 to 1</span></td>
                        </tr>
                        <tr>
                            <td class="empty"></td>
                            <td colspan="4" class="sector" data-sector="4">1st 12</td>
                            <td colspan="4" class="sector" data-sector="5">2nd 12</td>
                            <td colspan="4" class="sector" data-sector="6">3rd 12</td>
                            <td class="empty"></td>
                        </tr><tr>
                            <td class="empty"></td>
                            <td colspan="2" class="sector" data-sector="7">1 to 18</td>
                            <td colspan="2" class="sector" data-sector="8">EVEN</td>
                            <td colspan="2" class="sector red" data-sector="9">RED</td>
                            <td colspan="2" class="sector black" data-sector="10">BLACK</td>
                            <td colspan="2" class="sector" data-sector="11">ODD</td>
                            <td colspan="2" class="sector" data-sector="12">19 to 36</td>
                            <td class="empty"></td>
                        </tr>
                    </table>
                    <div class="controlls">
                        <div class="btn btn-zero" data-num="0"></div>
                        {/* col6 */}
                        <div class="col1">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="0,3"></div>
                                <div class="btn m rm cm" data-num="3"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="0,2,3"></div>
                                <div class="btn v rm cv" data-num="0,2"></div>
                                <div class="btn h rh cm" data-num="2,3"></div>
                                <div class="btn m rm cm" data-num="2"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="0,1,2"></div>
                                <div class="btn v rm cv" data-num="0,1"></div>
                                <div class="btn c rb cv" data-num="0,1,2,3"></div>
                                <div class="btn h rh cm" data-num="1,2"></div>
                                <div class="btn m rm cm" data-num="1"></div>
                                <div class="btn h rb cm" data-num="1,2,3"></div>
                            </div>
                            <div class="row4">
                                <div class="btn ms4 rm cm" data-type="sector" data-sector="4"></div>
                            </div>
                            <div class="row5">
                                <div class="btn ms2 rm cm" data-type="sector" data-sector="7"></div>
                            </div>
                        </div>
                        {/* col2 */}
                        <div class="col2">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="3,6"></div>
                                <div class="btn m rm cm" data-num="6"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="2,3,5,6"></div>
                                <div class="btn v rm cv" data-num="2,5"></div>
                                <div class="btn h rh cm" data-num="5,6"></div>
                                <div class="btn m rm cm" data-num="5"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="1,2,4,5"></div>
                                <div class="btn v rm cv" data-num="1,4"></div>
                                <div class="btn c rb cv" data-num="1,2,3,4,5,6"></div>
                                <div class="btn h rh cm" data-num="4,5"></div>
                                <div class="btn m rm cm" data-num="4"></div>
                                <div class="btn h rb cm" data-num="4,5,6"></div>
                            </div>
                        </div>
                        {/* col3 */}
                        <div class="col3">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="6,9"></div>
                                <div class="btn m rm cm" data-num="9"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="5,6,8,9"></div>
                                <div class="btn v rm cv" data-num="5,8"></div>
                                <div class="btn h rh cm" data-num="8,9"></div>
                                <div class="btn m rm cm" data-num="8"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="4,5,7,8"></div>
                                <div class="btn v rm cv" data-num="4,7"></div>
                                <div class="btn c rb cv" data-num="4,5,6,7,8,9"></div>
                                <div class="btn h rh cm" data-num="7,8"></div>
                                <div class="btn m rm cm" data-num="7"></div>
                                <div class="btn h rb cm" data-num="7,8,9"></div>
                            </div>
                            <div class="row5">
                                <div class="btn ms2 rm cm" data-type="sector" data-sector="8"></div>
                            </div>
                        </div>
                        {/* col4 */}
                        <div class="col4">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="9,12"></div>
                                <div class="btn m rm cm" data-num="12"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="8,9,11,12"></div>
                                <div class="btn v rm cv" data-num="8,11"></div>
                                <div class="btn h rh cm" data-num="11,12"></div>
                                <div class="btn m rm cm" data-num="11"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="7,8,10,11"></div>
                                <div class="btn v rm cv" data-num="7,10"></div>
                                <div class="btn c rb cv" data-num="7,8,9,10,11,12"></div>
                                <div class="btn h rh cm" data-num="10,11"></div>
                                <div class="btn m rm cm" data-num="10"></div>
                                <div class="btn h rb cm" data-num="10,11,12"></div>
                            </div>
                        </div>
                        {/* col5 */}
                        <div class="col5">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="12,15"></div>
                                <div class="btn m rm cm" data-num="15"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="11,12,14,15"></div>
                                <div class="btn v rm cv" data-num="11,14"></div>
                                <div class="btn h rh cm" data-num="14,15"></div>
                                <div class="btn m rm cm" data-num="14"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="10,11,13,14"></div>
                                <div class="btn v rm cv" data-num="10,13"></div>
                                <div class="btn c rb cv" data-num="10,11,12,13,14,15"></div>
                                <div class="btn h rh cm" data-num="13,14"></div>
                                <div class="btn m rm cm" data-num="13"></div>
                                <div class="btn h rb cm" data-num="13,14,15"></div>
                            </div>
                            <div class="row4">
                                <div class="btn ms4 rm cm" data-type="sector" data-sector="5"></div>
                            </div>
                            <div class="row5">
                                <div class="btn ms2 rm cm" data-type="sector" data-sector="9"></div>
                            </div>
                        </div>
                        {/* col6 */}
                        <div class="col6">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="15,18"></div>
                                <div class="btn m rm cm" data-num="18"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="14,15,17,18"></div>
                                <div class="btn v rm cv" data-num="14,17"></div>
                                <div class="btn h rh cm" data-num="17,18"></div>
                                <div class="btn m rm cm" data-num="17"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="13,14,16,17"></div>
                                <div class="btn v rm cv" data-num="13,16"></div>
                                <div class="btn c rb cv" data-num="13,14,15,16,17,18"></div>
                                <div class="btn h rh cm" data-num="16,17"></div>
                                <div class="btn m rm cm" data-num="16"></div>
                                <div class="btn h rb cm" data-num="16,17,18"></div>
                            </div>
                        </div>
                        {/* col7 */}
                        <div class="col7">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="18,21"></div>
                                <div class="btn m rm cm" data-num="21"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="17,18,20,21"></div>
                                <div class="btn v rm cv" data-num="17,20"></div>
                                <div class="btn h rh cm" data-num="20,21"></div>
                                <div class="btn m rm cm" data-num="20"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="16,17,19,20"></div>
                                <div class="btn v rm cv" data-num="16,19"></div>
                                <div class="btn c rb cv" data-num="16,17,18,19,20,21"></div>
                                <div class="btn h rh cm" data-num="19,20"></div>
                                <div class="btn m rm cm" data-num="19"></div>
                                <div class="btn h rb cm" data-num="19,20,21"></div>
                            </div>
                            <div class="row5">
                                <div class="btn ms2 rm cm" data-type="sector" data-sector="10"></div>
                            </div>
                        </div>
                        {/* col8 */}
                        <div class="col8">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="21,24"></div>
                                <div class="btn m rm cm" data-num="24"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="20,21,23,24"></div>
                                <div class="btn v rm cv" data-num="20,23"></div>
                                <div class="btn h rh cm" data-num="23,24"></div>
                                <div class="btn m rm cm" data-num="23"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="19,20,22,23"></div>
                                <div class="btn v rm cv" data-num="19,22"></div>
                                <div class="btn c rb cv" data-num="19,20,21,22,23,24"></div>
                                <div class="btn h rh cm" data-num="22,23"></div>
                                <div class="btn m rm cm" data-num="22"></div>
                                <div class="btn h rb cm" data-num="22,23,24"></div>
                            </div>
                        </div>
                        {/* col9 */}
                        <div class="col9">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="24,27"></div>
                                <div class="btn m rm cm" data-num="27"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="23,24,26,27"></div>
                                <div class="btn v rm cv" data-num="23,26"></div>
                                <div class="btn h rh cm" data-num="26,27"></div>
                                <div class="btn m rm cm" data-num="26"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="22,23,25,26"></div>
                                <div class="btn v rm cv" data-num="22,25"></div>
                                <div class="btn c rb cv" data-num="22,23,24,25,26,27"></div>
                                <div class="btn h rh cm" data-num="25,26"></div>
                                <div class="btn m rm cm" data-num="25"></div>
                                <div class="btn h rb cm" data-num="25,26,27"></div>
                            </div>
                            <div class="row4">
                                <div class="btn ms4 rm cm" data-type="sector" data-sector="6"></div>
                            </div>
                            <div class="row5">
                                <div class="btn ms2 rm cm" data-type="sector" data-sector="11"></div>
                            </div>
                        </div>
                        {/* col10 */}
                        <div class="col10">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="27,30"></div>
                                <div class="btn m rm cm" data-num="30"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="26,27,29,30"></div>
                                <div class="btn v rm cv" data-num="26,29"></div>
                                <div class="btn h rh cm" data-num="29,30"></div>
                                <div class="btn m rm cm" data-num="29"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="25,26,28,29"></div>
                                <div class="btn v rm cv" data-num="25,28"></div>
                                <div class="btn c rb cv" data-num="25,26,27,28,29,30"></div>
                                <div class="btn h rh cm" data-num="28,29"></div>
                                <div class="btn m rm cm" data-num="28"></div>
                                <div class="btn h rb cm" data-num="28,29,30"></div>
                            </div>
                        </div>
                        {/* col11 */}
                        <div class="col11">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="30,33"></div>
                                <div class="btn m rm cm" data-num="33"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="29,30,32,33"></div>
                                <div class="btn v rm cv" data-num="29,32"></div>
                                <div class="btn h rh cm" data-num="32,33"></div>
                                <div class="btn m rm cm" data-num="32"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="28,29,31,32"></div>
                                <div class="btn v rm cv" data-num="28,31"></div>
                                <div class="btn c rb cv" data-num="28,29,30,31,32,33"></div>
                                <div class="btn h rh cm" data-num="31,32"></div>
                                <div class="btn m rm cm" data-num="31"></div>
                                <div class="btn h rb cm" data-num="31,32,33"></div>
                            </div>
                            <div class="row5">
                                <div class="btn ms2 rm cm" data-type="sector" data-sector="12"></div>
                            </div>
                        </div>
                        {/* col12 */}
                        <div class="col12">
                            <div class="row1">
                                <div class="btn v rm cv" data-num="33,36"></div>
                                <div class="btn m rm cm" data-num="36"></div>
                            </div>
                            <div class="row2">
                                <div class="btn c rh cv" data-num="32,33,35,36"></div>
                                <div class="btn v rm cv" data-num="32,35"></div>
                                <div class="btn h rh cm" data-num="35,36"></div>
                                <div class="btn m rm cm" data-num="35"></div>
                            </div>
                            <div class="row3">
                                <div class="btn c rh cv" data-num="31,32,34,35"></div>
                                <div class="btn v rm cv" data-num="31,34"></div>
                                <div class="btn c rb cv" data-num="31,32,33,34,35,36"></div>
                                <div class="btn h rh cm" data-num="34,35"></div>
                                <div class="btn m rm cm" data-num="34"></div>
                                <div class="btn h rb cm" data-num="34,35,36"></div>
                            </div>
                        </div>
                        {/* col13 */}
                        <div class="col13">
                            <div class="row1">
                                <div class="btn m rm cm" data-type="sector" data-sector="1"></div>
                            </div>
                            <div class="row2">
                                <div class="btn m rm cm" data-type="sector" data-sector="2"></div>
                            </div>
                            <div class="row3">
                                <div class="btn m rm cm" data-type="sector" data-sector="3"></div>
                            </div>
                        </div>
                    </div>
                </div>
                Your bets:
                    <div>
                        <button onClick='Place()'>Place bet</button>
                        <button onClick='Reset()'>Reset</button>
                        <div id='bets'></div>
                        <div id='balance'>Balance: 1.00 ETH</div>
                        <div id='result'></div>
                    </div>
            </div>
            </div>

        </div>
        </div>
    </div> 
    );
  }
}