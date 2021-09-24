import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import Modal from "react-modal";

import "../styles/chatlist.scss";
import "../styles/modal.scss";
import ListChat from "./ListChat";
import { selectUser } from './userSlice';
import db, { auth } from '../firebase';

import { Avatar, Button, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const Chatlist = () => {
  const user = useSelector(selectUser);
  const [modal, setModal] = useState(false);
  const [chatInput, setChatInput] = useState(null);
  const [imageInput, setImageInput] = useState("https://clck.ru/XeSMj");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .orderBy("chatName", "asc")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            chatName: doc.data(),
          }))
        )
      );
  }, []);

  const addNewChat = () => {
    if (chatInput) {
      db.collection("chats").add({
        chatName: chatInput,
        chatImage: imageInput,
      });
    }

    setChatInput(null);
    setImageInput("");
    setModal(false);
  };

  return (
    <div className="chatlist">
      <div className="chatlist__header">
        <ExitToAppIcon onClick={() => auth.signOut()} />
        <Avatar onClick={() => alert(user.displayName)} src={user.photo} />
        <div className="chatlist__input">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
        <AddIcon onClick={() => setModal(true)} className="chatlist__add" />
        <Modal
          isOpen={modal}
          onRequestClose={() => setModal(false)}
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
              border: '1px solid #ccc',
              background: 'rgb(203, 204, 206)',
              borderRadius: '4px',
            }
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
           
            <Button className='modal_create_but' onClick={addNewChat}>Create</Button>
            <Button className='modal_cancel_but' onClick={() => setModal(false)} variant="outlined">
              Cancel
            </Button>
            
          </div>
        </Modal>
      </div>
      <div className="chatlist__chats">
        <FlipMove>
          {chats.map(({ id, chatName }) => (
            <ListChat
              key={id}
              id={id}
              name={chatName.chatName}
              chatImage={chatName.chatImage}
            />
          ))}
        </FlipMove>
      </div>
      <div className="chatlist__bookmarks">
        <div className="chatlist__bookmarksIcon">
          <BookmarkIcon />
        </div>
        <p>Bookmarks</p>
      </div>
    </div>
  );
}

export default Chatlist;
