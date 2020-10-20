import React from 'react';
import './login.css';
import Button from "@material-ui/core/Button";
import {auth, provider} from "../../firebase";

const Login = () => {  
  const handleLogin = async () => {
    try {
      const res = await auth.signInWithPopup(provider);
    } catch(err) {
      alert(err);
    }    
  };

  return (
    <div className="login">
      <div className="login-logo-container">
        <h1>Telegram</h1>
        <img 
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
          alt=""
        />
        <Button
          className="login-button"
          onClick = {() => handleLogin()}
        >
            Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
