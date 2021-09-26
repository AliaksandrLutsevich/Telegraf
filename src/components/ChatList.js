import React, { useState, useMemo } from "react";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import Modal from "react-modal";

import ListChat from "./ListChat";
import { selectUser } from "./userSlice";

import firebase from 'firebase';
import db, { auth } from "../firebase";

import "../styles/chatlist.scss";
import "../styles/modal.scss";

import { Avatar, Button, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const Chatlist = () => {
  const user = useSelector(selectUser);
  const [modal, setModal] = useState(false);
  const [chatInput, setChatInput] = useState(null);
  const [imageInput, setImageInput] = useState("https://clck.ru/XeSMj");
  const [chats, setChats] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useMemo(() => {
    db.collection("chats")
      .orderBy("chatName", 'asc')
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            chatName: doc.data(),
          }))
        )
      );
  }, []);

  const addChat = (e) => {
    if (chatInput) {
      db.collection("chats").add({
        chatName: chatInput,
        chatImage: imageInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setChatInput(null);
    setImageInput("https://clck.ru/XeSMj");
    setModal(false);
  };

  const cancelChat = () => {
    setChatInput(null);
    setImageInput("https://clck.ru/XeSMj");
    setModal(false);
  };

  // const filteredChats = chats.filter((name) => {
  //   return name.chatName.chatName
  //     .toLowerCase()
  //     .includes(searchValue.toLowerCase());
  // });

  // console.log(filteredChats);

  return (
    <div className="chatlist">
      <div className="chatlist__header">
        <ExitToAppIcon onClick={() => auth.signOut()} />
        <Avatar onClick={() => alert(user.displayName)} src={user.photo} />
        <div className="chatlist__input">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <AddIcon onClick={() => setModal(true)} className="chatlist__add" />
        <Modal
          isOpen={modal}
          onRequestClose={false}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              top: "20%",
              left: "30%",
              width: 400,
              height: 400,
              zIndex: 10,
              marginBottom: "100px",
              marginRight: "100px",
              background: "none",
            },
            content: {
              border: "1px solid #ccc",
              background: "rgb(203, 204, 206)",
              borderRadius: "4px",
            },
          }}
        >
          <div className="modal__info">
            <h2>Let's create a chat!</h2>
            <Input
              required
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="modal__input-name"
              type="text"
              placeholder="Enter chat name"
            />
            <h2>Set chat image(URL)</h2>
            <Input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="modal__input-image"
              type="text"
              placeholder="Enter image link"
            />

            <Button className="modal__create_button" onClick={addChat}>
              Create
            </Button>
            <Button
              className="modal__cancel_button"
              onClick={cancelChat}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
      <div className="chatlist__chats">
        <FlipMove>
          {chats.filter((name) => {
    return name.chatName.chatName
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  })
          .map(({ id, chatName }) => (
            <ListChat
              key={id}
              id={id}
              name={chatName.chatName}
              chatImage={
                chatName.chatImage
                  ? chatName.chatImage
                  : "https://clck.ru/XeSMj"
              }
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
};

export default Chatlist;
