import React, { forwardRef } from "react";
import "../styles/message.scss";

const Message = forwardRef(
  ({ id, message, timestamp, sender, senderName }, ref) => {
    return (
      <div ref={ref} className="message">
        <div className="message__content">
        <span>{senderName}</span>
          <p>{message}</p>
          <small>{new Date(timestamp?.toDate()).toLocaleString}</small>
        </div>
      </div>
   );
  }
);

export default Message;
