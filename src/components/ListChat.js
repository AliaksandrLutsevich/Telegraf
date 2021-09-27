import React, { forwardRef, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setChatInfo } from "./chatSlice";
import "../styles/listchat.scss";

import { Avatar } from "@material-ui/core";

import * as timeago from "timeago.js";
import db from "../firebase";

const ListChat = forwardRef(({ id, name, chatImage }, ref) => {
  const dispatch = useDispatch();
  const [lastMessage, setLastMessage] = useState("");

  useMemo(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setLastMessage(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  function validTimestamp(lastMes) {
    if (lastMes === undefined) {
      return lastMes = ''
    } else if (lastMes.length > 0) {
      return lastMes.slice(0, 15)
    } else {
      return lastMes }
}

  return (
    <div
      ref={ref}
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
        <p>{validTimestamp(lastMessage[0]?.message)}</p>
      </div>
    </div>
  );
});

export default ListChat;
