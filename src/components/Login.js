import React from "react";
import "../styles/login.scss";
import { auth, provider } from "../firebase";


const Login = () => {
  const signIn = (e) => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__imgbox login__logo"></div>
      <button className="login__button" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Login;
