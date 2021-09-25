import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./userSlice";
import "../styles/message.scss";


const Message = forwardRef(
  ({ id, message, timestamp, sender, senderName }, ref) => {
    const user = useSelector(selectUser);

    return (
      <div ref={ref} className="message">
        
        <div className={`${user.email === sender ? 'message__info' : 'message__infoSender'}`}>
        <div className="message__content">
        <span>{senderName}</span>
          <p>{message}</p>
          <small>{new Date(timestamp?.toDate()).toLocaleString}</small>
        </div>
      </div>
      </div>
   );
  }
);

export default Message;
