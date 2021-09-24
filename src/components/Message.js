import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import "../styles/message.scss";
import { selectUser } from "./userSlice";


const Message = forwardRef(
  ({ id, message, timestamp, sender, senderName }, ref) => {
    const user = useSelector(selectUser);

    return (
      <div ref={ref} className="message">
        <div className="message__content">
        <div className={`${user.email === sender ? 'message__info' : 'message__infoSender'}`}>
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
