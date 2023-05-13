import React, { useContext } from "react";
import UserContext from "../UserContext";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import Image from "next/image";

const Sidebar = ({ isLoggedIn }) => {
  const { username } = useContext(UserContext);
  console.log(username)
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <Image
          src="/TaskEase.svg" // Path to your image
          alt="TaskEase Logo" // Alt text for the image
          width={140} // Width of the image
          height={40} // Height of the image
        />
      </div>
      <p>{username}</p>
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
