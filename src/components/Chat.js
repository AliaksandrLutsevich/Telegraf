import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";

import "../styles/chat.scss";
import { selectChatImage, selectChatName, selectChatId } from "./chatSlice";
import { selectUser } from "./userSlice";
import Message from "./Message";
import {
  db,
  Timestamp,
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  addDoc,
  getDocs,
  collectionGroup,
  query
} from "../firebase";

import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicNoneIcon from "@material-ui/icons/MicNone";
import AttachFileIcon from "@material-ui/icons/AttachFile";


const Chat = () => {
  const chatImage = useSelector(selectChatImage);
  const chatName = useSelector(selectChatName);
  const [input, setInput] = useState("");
  const chatId = useSelector(selectChatId);
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   if (chatId) {
  //   onSnapshot(
  //     doc((collection(db, "chats"))
  //       .doc(chatId)
  //     .doc((collection(db, "chats")),
  //     (snapshot) => {
  //       setMessages(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           chatName: doc.data(),
  //         }))
  //       );
  //       console.log(messages);
  //       // query(chats, orderBy("timestamp", "desc"))
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   ),
  // }, [chatId]);

  // useEffect(() => {
  //   if (chatId) {
  //     db.collection("chats")
  //       .doc(chatId)
  //       .collection("messages")
        
  //       .onSnapshot((snapshot) =>
  //         setMessages(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             message: doc.data(),
  //           }))
  //         )
  //       );
  //   }
  // }, [chatId]);

  // const handleMessage = (e) => {
  //   e.preventDefault();
  //   if (chatId) {
  //     const messages = doc(chatId).collection(db, 'chats', 'messages')
  //     setDoc(addDoc(messages), {
  //       user: user,
  //       message: input,
  //     });
  //   }
  //   setInput('');
  // };


  const sendMessage = (e) => {
    e.preventDefault();
    if (chatId) {
      const messages = (doc(db, 'chats', chatId));
      setDoc(messages, {
        user: user,
        message: input,
      });
    }
    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header-left">
          <Avatar src={chatImage} />
          <h5>{chatName}</h5>
        </div>
        <div className="chat__header-right">
          <SearchIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="chat__body">
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message
              key={id}
              id={id}
              message={message.message}
              // timestamp={message.timestamp}
              sender={message.user.email}
              senderName={message.user.displayName}
            />
          ))}
        </FlipMove>
      </div>
      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Message"
            required
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <div className="chat__footerIcons">
          <MicNoneIcon />
          <AttachFileIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
