import React, {forwardRef, useEffect} from "react";
import "../styles/listchat.scss";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {setChatInfo} from "./chatSlice";

const ListChat = forwardRef(({ id, name, chatImage }, ref) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   collection(db, 'chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot)=>)
  // })

  return (
    <div className="list_chat" onClick = {() => dispatch(setChatInfo({
      chatId: id,
      chatName: name,
      chatImage: chatImage,
    }))}>
      <Avatar src={chatImage} />
      <div className="list_chat__info">
        <small>Timestamp</small>
        <h3>{name}</h3>
        <p>Message</p>
      </div>
    </div>
  );
})

export default ListChat;
