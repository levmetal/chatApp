import React from 'react';
import ReactEmoji from 'react-emoji';
import './message.css'

const Message = ({ message: { text, user }, name }) => {
  let currentUser = false;

  const cleanText = name.trim().toLowerCase();         //elimina espacios en blanco y devuelve el texto en minuscula

  if(user === cleanText) {
    currentUser = true;
  }

  return (
    currentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{cleanText}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText textColor">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;
