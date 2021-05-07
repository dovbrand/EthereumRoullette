import React from 'react';
import './board.css';

//import '../public/index.html';


function board() {

	return (
		<div>
			<div className="roulette">
                <table>
                    <tbody>
                        <tr className="nums">
                            <td className="num green zero" rowSpan="3"><span>0</span></td>
                            <td className="num red"><span>3</span></td>
                            <td className="num black"><span>6</span></td>
                            <td className="num red"><span>9</span></td>
                            <td className="num red"><span>12</span></td>
                            <td className="num black"><span>15</span></td>
                            <td className="num red"><span>18</span></td>
                            <td className="num red"><span>21</span></td>
                            <td className="num black"><span>24</span></td>
                            <td className="num red"><span>27</span></td>
                            <td className="num red"><span>30</span></td>
                            <td className="num black"><span>33</span></td>
                            <td className="num red"><span>36</span></td>
                            <td className="sector" data-sector="1"><span className="vt">2 to 1</span></td>
                        </tr>
                        <tr className="nums">
                            <td className="hidden"></td>
                            <td className="num black"><span>2</span></td>
                            <td className="num red"><span>5</span></td>
                            <td className="num black"><span>8</span></td>
                            <td className="num black"><span>11</span></td>
                            <td className="num red"><span>14</span></td>
                            <td className="num black"><span>17</span></td>
                            <td className="num black"><span>20</span></td>
                            <td className="num red"><span>23</span></td>
                            <td className="num black"><span>26</span></td>
                            <td className="num black"><span>29</span></td>
                            <td className="num red"><span>32</span></td>
                            <td className="num black"><span>35</span></td>
                            <td className="sector" data-sector="2"><span className="vt">2 to 1</span></td>
                        </tr>
                        <tr className="nums">
                            <td className="hidden"></td>
                            <td className="num red"><span>1</span></td>
                            <td className="num black"><span>4</span></td>
                            <td className="num red"><span>7</span></td>
                            <td className="num black"><span>10</span></td>
                            <td className="num black"><span>13</span></td>
                            <td className="num red"><span>16</span></td>
                            <td className="num red"><span>19</span></td>
                            <td className="num black"><span>22</span></td>
                            <td className="num red"><span>25</span></td>
                            <td className="num black"><span>28</span></td>
                            <td className="num black"><span>31</span></td>
                            <td className="num red"><span>34</span></td>
                            <td className="sector" data-sector="3"><span className="vt">2 to 1</span></td>
                        </tr>
                        <tr>
                            <td className="empty"></td>
                            <td colSpan="4" className="sector" data-sector="4">1st 12</td>
                            <td colSpan="4" className="sector" data-sector="5">2nd 12</td>
                            <td colSpan="4" className="sector" data-sector="6">3rd 12</td>
                            <td className="empty"></td>
                        </tr>
                        <tr>
                            <td className="empty"></td>
                            <td colSpan="2" className="sector" data-sector="7">1 to 18</td>
                            <td colSpan="2" className="sector" data-sector="8">EVEN</td>
                            <td colSpan="2" className="sector red" data-sector="9">RED</td>
                            <td colSpan="2" className="sector black" data-sector="10">BLACK</td>
                            <td colSpan="2" className="sector" data-sector="11">ODD</td>
                            <td colSpan="2" className="sector" data-sector="12">19 to 36</td>
                            <td className="empty"></td>
                        </tr>
                    </tbody>
                </table>
                <div className="controlls">
                    <div className="col0">
                        <div className="row0">
                            <div className="btn btn-zero cm" data-num="0"></div>
                        </div>
                    </div>
                    {/* col6 */}
                    <div className="col1">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="0,3"></div>
                            <div className="btn m rm cm" data-num="3"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="0,2,3"></div>
                            <div className="btn v rm cv" data-num="0,2"></div>
                            <div className="btn h rh cm" data-num="2,3"></div>
                            <div className="btn m rm cm" data-num="2"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="0,1,2"></div>
                            <div className="btn v rm cv" data-num="0,1"></div>
                            <div className="btn c rb cv" data-num="0,1,2,3"></div>
                            <div className="btn h rh cm" data-num="1,2"></div>
                            <div className="btn m rm cm" data-num="1"></div>
                            <div className="btn h rb cm" data-num="1,2,3"></div>
                        </div>
                        <div className="row4">
                            <div className="btn ms4 rm cm" data-type="sector" data-sector="4"></div>
                        </div>
                        <div className="row5">
                            <div className="btn ms2 rm cm" data-type="sector" data-sector="7"></div>
                        </div>
                    </div>
                    {/* col2 */}
                    <div className="col2">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="3,6"></div>
                            <div className="btn m rm cm" data-num="6"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="2,3,5,6"></div>
                            <div className="btn v rm cv" data-num="2,5"></div>
                            <div className="btn h rh cm" data-num="5,6"></div>
                            <div className="btn m rm cm" data-num="5"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="1,2,4,5"></div>
                            <div className="btn v rm cv" data-num="1,4"></div>
                            <div className="btn c rb cv" data-num="1,2,3,4,5,6"></div>
                            <div className="btn h rh cm" data-num="4,5"></div>
                            <div className="btn m rm cm" data-num="4"></div>
                            <div className="btn h rb cm" data-num="4,5,6"></div>
                        </div>
                    </div>
                    {/* col3 */}
                    <div className="col3">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="6,9"></div>
                            <div className="btn m rm cm" data-num="9"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="5,6,8,9"></div>
                            <div className="btn v rm cv" data-num="5,8"></div>
                            <div className="btn h rh cm" data-num="8,9"></div>
                            <div className="btn m rm cm" data-num="8"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="4,5,7,8"></div>
                            <div className="btn v rm cv" data-num="4,7"></div>
                            <div className="btn c rb cv" data-num="4,5,6,7,8,9"></div>
                            <div className="btn h rh cm" data-num="7,8"></div>
                            <div className="btn m rm cm" data-num="7"></div>
                            <div className="btn h rb cm" data-num="7,8,9"></div>
                        </div>
                        <div className="row5">
                            <div className="btn ms2 rm cm" data-type="sector" data-sector="8"></div>
                        </div>
                    </div>
                    {/* col4 */}
                    <div className="col4">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="9,12"></div>
                            <div className="btn m rm cm" data-num="12"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="8,9,11,12"></div>
                            <div className="btn v rm cv" data-num="8,11"></div>
                            <div className="btn h rh cm" data-num="11,12"></div>
                            <div className="btn m rm cm" data-num="11"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="7,8,10,11"></div>
                            <div className="btn v rm cv" data-num="7,10"></div>
                            <div className="btn c rb cv" data-num="7,8,9,10,11,12"></div>
                            <div className="btn h rh cm" data-num="10,11"></div>
                            <div className="btn m rm cm" data-num="10"></div>
                            <div className="btn h rb cm" data-num="10,11,12"></div>
                        </div>
                    </div>
                    {/* col5 */}
                    <div className="col5">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="12,15"></div>
                            <div className="btn m rm cm" data-num="15"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="11,12,14,15"></div>
                            <div className="btn v rm cv" data-num="11,14"></div>
                            <div className="btn h rh cm" data-num="14,15"></div>
                            <div className="btn m rm cm" data-num="14"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="10,11,13,14"></div>
                            <div className="btn v rm cv" data-num="10,13"></div>
                            <div className="btn c rb cv" data-num="10,11,12,13,14,15"></div>
                            <div className="btn h rh cm" data-num="13,14"></div>
                            <div className="btn m rm cm" data-num="13"></div>
                            <div className="btn h rb cm" data-num="13,14,15"></div>
                        </div>
                        <div className="row4">
                            <div className="btn ms4 rm cm" data-type="sector" data-sector="5"></div>
                        </div>
                        <div className="row5">
                            <div className="btn ms2 rm cm" data-type="sector" data-sector="9"></div>
                        </div>
                    </div>
                    {/* col6 */}
                    <div className="col6">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="15,18"></div>
                            <div className="btn m rm cm" data-num="18"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="14,15,17,18"></div>
                            <div className="btn v rm cv" data-num="14,17"></div>
                            <div className="btn h rh cm" data-num="17,18"></div>
                            <div className="btn m rm cm" data-num="17"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="13,14,16,17"></div>
                            <div className="btn v rm cv" data-num="13,16"></div>
                            <div className="btn c rb cv" data-num="13,14,15,16,17,18"></div>
                            <div className="btn h rh cm" data-num="16,17"></div>
                            <div className="btn m rm cm" data-num="16"></div>
                            <div className="btn h rb cm" data-num="16,17,18"></div>
                        </div>
                    </div>
                    {/* col7 */}
                    <div className="col7">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="18,21"></div>
                            <div className="btn m rm cm" data-num="21"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="17,18,20,21"></div>
                            <div className="btn v rm cv" data-num="17,20"></div>
                            <div className="btn h rh cm" data-num="20,21"></div>
                            <div className="btn m rm cm" data-num="20"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="16,17,19,20"></div>
                            <div className="btn v rm cv" data-num="16,19"></div>
                            <div className="btn c rb cv" data-num="16,17,18,19,20,21"></div>
                            <div className="btn h rh cm" data-num="19,20"></div>
                            <div className="btn m rm cm" data-num="19"></div>
                            <div className="btn h rb cm" data-num="19,20,21"></div>
                        </div>
                        <div className="row5">
                            <div className="btn ms2 rm cm" data-type="sector" data-sector="10"></div>
                        </div>
                    </div>
                    {/* col8 */}
                    <div className="col8">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="21,24"></div>
                            <div className="btn m rm cm" data-num="24"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="20,21,23,24"></div>
                            <div className="btn v rm cv" data-num="20,23"></div>
                            <div className="btn h rh cm" data-num="23,24"></div>
                            <div className="btn m rm cm" data-num="23"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="19,20,22,23"></div>
                            <div className="btn v rm cv" data-num="19,22"></div>
                            <div className="btn c rb cv" data-num="19,20,21,22,23,24"></div>
                            <div className="btn h rh cm" data-num="22,23"></div>
                            <div className="btn m rm cm" data-num="22"></div>
                            <div className="btn h rb cm" data-num="22,23,24"></div>
                        </div>
                    </div>
                    {/* col9 */}
                    <div className="col9">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="24,27"></div>
                            <div className="btn m rm cm" data-num="27"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="23,24,26,27"></div>
                            <div className="btn v rm cv" data-num="23,26"></div>
                            <div className="btn h rh cm" data-num="26,27"></div>
                            <div className="btn m rm cm" data-num="26"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="22,23,25,26"></div>
                            <div className="btn v rm cv" data-num="22,25"></div>
                            <div className="btn c rb cv" data-num="22,23,24,25,26,27"></div>
                            <div className="btn h rh cm" data-num="25,26"></div>
                            <div className="btn m rm cm" data-num="25"></div>
                            <div className="btn h rb cm" data-num="25,26,27"></div>
                        </div>
                        <div className="row4">
                            <div className="btn ms4 rm cm" data-type="sector" data-sector="6"></div>
                        </div>
                        <div className="row5">
                            <div className="btn ms2 rm cm" data-type="sector" data-sector="11"></div>
                        </div>
                    </div>
                    {/* col10 */}
                    <div className="col10">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="27,30"></div>
                            <div className="btn m rm cm" data-num="30"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="26,27,29,30"></div>
                            <div className="btn v rm cv" data-num="26,29"></div>
                            <div className="btn h rh cm" data-num="29,30"></div>
                            <div className="btn m rm cm" data-num="29"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="25,26,28,29"></div>
                            <div className="btn v rm cv" data-num="25,28"></div>
                            <div className="btn c rb cv" data-num="25,26,27,28,29,30"></div>
                            <div className="btn h rh cm" data-num="28,29"></div>
                            <div className="btn m rm cm" data-num="28"></div>
                            <div className="btn h rb cm" data-num="28,29,30"></div>
                        </div>
                    </div>
                    {/* col11 */}
                    <div className="col11">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="30,33"></div>
                            <div className="btn m rm cm" data-num="33"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="29,30,32,33"></div>
                            <div className="btn v rm cv" data-num="29,32"></div>
                            <div className="btn h rh cm" data-num="32,33"></div>
                            <div className="btn m rm cm" data-num="32"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="28,29,31,32"></div>
                            <div className="btn v rm cv" data-num="28,31"></div>
                            <div className="btn c rb cv" data-num="28,29,30,31,32,33"></div>
                            <div className="btn h rh cm" data-num="31,32"></div>
                            <div className="btn m rm cm" data-num="31"></div>
                            <div className="btn h rb cm" data-num="31,32,33"></div>
                        </div>
                        <div className="row5">
                            <div className="btn ms2 rm cm" data-type="sector" data-sector="12"></div>
                        </div>
                    </div>
                    {/* col12 */}
                    <div className="col12">
                        <div className="row1">
                            <div className="btn v rm cv" data-num="33,36"></div>
                            <div className="btn m rm cm" data-num="36"></div>
                        </div>
                        <div className="row2">
                            <div className="btn c rh cv" data-num="32,33,35,36"></div>
                            <div className="btn v rm cv" data-num="32,35"></div>
                            <div className="btn h rh cm" data-num="35,36"></div>
                            <div className="btn m rm cm" data-num="35"></div>
                        </div>
                        <div className="row3">
                            <div className="btn c rh cv" data-num="31,32,34,35"></div>
                            <div className="btn v rm cv" data-num="31,34"></div>
                            <div className="btn c rb cv" data-num="31,32,33,34,35,36"></div>
                            <div className="btn h rh cm" data-num="34,35"></div>
                            <div className="btn m rm cm" data-num="34"></div>
                            <div className="btn h rb cm" data-num="34,35,36"></div>
                        </div>
                    </div>
                    {/* col13 */}
                    <div className="col13">
                        <div className="row1">
                            <div className="btn m rm cm" data-type="sector" data-sector="1"></div>
                        </div>
                        <div className="row2">
                            <div className="btn m rm cm" data-type="sector" data-sector="2"></div>
                        </div>
                        <div className="row3">
                            <div className="btn m rm cm" data-type="sector" data-sector="3"></div>
                        </div>
                    </div>
                </div>
            </div>            
		</div>
	);
}

export default board