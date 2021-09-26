import React, { forwardRef, useState, useMemo } from "react";
import { useDispatch} from "react-redux";
import { setChatInfo } from "./chatSlice";
import "../styles/listchat.scss";

import { Avatar } from "@material-ui/core";

import * as timeago from 'timeago.js';
import db from "../firebase";

const ListChat = forwardRef(({ id, name, chatImage }, ref) => {
  const dispatch = useDispatch();
  const [lastMessage, setLastMessage] = useState('');

  useMemo(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setLastMessage(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      className="list_chat"
      onClick={() =>
        dispatch(
          setChatInfo({
            chatId: id,
            chatName: name,
            chatImage: chatImage,
          })
        )
      }
    >
      <Avatar src={chatImage} />
      <div className="list_chat__info">
        <small>{timeago.format(lastMessage[0]?.timestamp?.toDate())}</small>
        <h3>{name}</h3>
        <p>{lastMessage[0]?.message}</p>
      </div>
    </div>
  );
});

export default ListChat;
