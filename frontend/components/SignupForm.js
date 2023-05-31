import React, { useState } from "react";
import Image from "next/image";
import styles from "./LoginForm.module.css";

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8082/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        email,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      onSignup();
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
        <h1 className={styles.loginTitle}>Signup</h1>
        <form onSubmit={handleSubmit} className={`mt-5 ${styles.loginForm}`}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
