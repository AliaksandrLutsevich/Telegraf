import React from "react";
import "../styles/login.scss";
import { signIn } from "../firebase";


const Login = () => {
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
