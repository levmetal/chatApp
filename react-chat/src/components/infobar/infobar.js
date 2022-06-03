import React from 'react';
import './infobar.css';

import conectado from '../../icons/conectado.png';


const InfoBar =({room})=>(

    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={conectado} alt="online icon" />
        <h3> Sala {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><i class="material-icons ">power_settings_new</i></a>
      </div>
    </div>


)



export default InfoBar
