import React, { useState, useContext } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from 'next/image'; 
import styles from "./LoginForm.module.css"; 
import UserContext from "../UserContext";

const LoginForm = ({ onLogin }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      Cookies.set("session", data.session_guid);
      Cookies.set("username", username)
      console.log("session guid is:" , data.session_guid);
      setUsername(username); 
      console.log("set username in LoginForm:", username); 
     
      onLogin();
    } else {
      alert(data.error);
    }
  }

  return (
    <div className={styles.loginRoot}>
      <Image
        src="/TaskEase.svg" // Path to your image
        alt="TaskEase Logo" // Alt text for the image
        width={340} // Width of the image
        height={240} // Height of the image
      />
      <div className={`container ${styles.loginContainer}`}>
        <h1 className={styles.loginTitle}>Login</h1>
        <form onSubmit={handleSubmit} className={`mt-5 ${styles.loginForm}`}>
          <div className="form-group">
            <label htmlFor="username" className={styles.loginLabel}>
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className={`form-control ${styles.loginInput}`}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className={styles.loginLabel}>
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${styles.loginInput}`}
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        <div className="mt-3">
          <Link href="/signup" className={styles.signupLink}>
            Don't have an account? Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

