import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

const Sidebar = ({ isLoggedIn }) => {
  const router = useRouter();

  const username = Cookies.get("username");

  const handleLogout = async () => {

    const guid = Cookies.get('session')
    const response = await fetch("http://127.0.0.1:8080/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ guid }),
    });
   

     const data = await response.json();

     console.log(data);

       if (data.signout_status) {
      Cookies.remove("session");
      setUsername(null);
      router.push("/login"); // redirect to login page
    } else {
      console.error(data.message);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <Image
          src="/TaskEase.svg"
          alt="TaskEase Logo"
          width={140}
          height={40}
        />
      </div>
      {username ? (
        <>
          <div className={styles.username}>
            <p>User: {username}</p>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </>
      ) : null}
      <hr className={styles.hr} />
      <ul>
        <li>
          <Link href="/sections/inbox" className={styles.link}>
            Inbox 💭
          </Link>
        </li>
        <hr className={styles.hr} />
        <li>
          <Link href="/sections/today" className={styles.link}>
            Today 📆
          </Link>
        </li>
        <hr className={styles.hr} />
        <li>
          <Link href="/sections/focus" className={styles.link}>
            Focus ⏰
          </Link>
        </li>
        <hr className={styles.hr} />
        <li>
          <Link href="/sections/journal" className={styles.link}>
            Journal 📔
          </Link>
        </li>
        <hr className={styles.hr} />
        <li>
          <a className={styles.link}>Zen Zone</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
