import '@/styles/globals.css'
import "../styles/react-datepicker.css";
import Sidebar from "/components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/global.css";
import UserContext from "../UserContext";
import React, { useState, useEffect } from "react";



export default function App({ Component, pageProps }) {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    console.log("username in App:", username);
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <div>
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </UserContext.Provider>
  );
}
