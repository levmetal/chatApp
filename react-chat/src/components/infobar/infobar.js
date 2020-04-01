import React from 'react';
import './infobar.css';
import close from '../../icons/close.png';
import conectado from '../../icons/conectado.png';


const InfoBar =({room})=>(

    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={conectado} alt="online icon" />
        <h3> Sala {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><img src={close} alt="close icon" /></a>
      </div>
    </div>


)



export default InfoBar
