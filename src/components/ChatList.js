import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";

import "../styles/chatlist.scss";
import ListChat from "./ListChat";
import { selectUser } from "./userSlice";
import {
  auth,
  db,
  Timestamp,
  collection,
  doc,
  setDoc,
  onSnapshot,
  addDoc,
} from "../firebase";
import Modal from "react-modal";

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
    onSnapshot(
      collection(db, "chats"),
      (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            chatName: doc.data(),
          }))
        );
        console.log(chats);
        // query(chats, orderBy("timestamp", "desc"))
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  // const handleChat = (e) => {
  //   if (chatInput) {
  //     const chatsRef =  doc(collection(db, 'chats'));
  //    setDoc(chatsRef,
  //     {
  //       chatName: chatInput,
  //       chatImage: imageInput,
  //       timestamp: Timestamp.now(),
  //     });
  //     console.log(chatsRef)
  //   }
  //   setChatInput(null);
  //   setImageInput("https://clck.ru/XeSMj");
  //   setModal(false);
  // };

  const handleChat = async (e) => {
    if (chatInput) {
      const chatsRef = await addDoc(collection(db, "chats"), {
        chatName: chatInput,
        chatImage: imageInput,
        timestamp: Timestamp.now(),
      });
      console.log(chatsRef);
    }
    setChatInput(null);
    setImageInput("https://clck.ru/XeSMj");
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
          }}
        >
          <div className="modal__info">
            <h2>Create a chat</h2>
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
            <Button onClick={handleChat}>Create</Button>
            <Button onClick={() => setModal(false)} variant="outlined">
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
