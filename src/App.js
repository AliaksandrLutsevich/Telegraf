import React, { useEffect } from "react";
import "./styles/App.scss";
import { useDispatch, useSelector } from "react-redux";

import Chatlist from "./components/ChatList";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { login, logout, selectUser } from "./components/userSlice";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <Chatlist />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
