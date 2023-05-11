import React from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        FocusFlow
        <ion-icon
          name="timer-outline"
          className={styles.icon} 
        ></ion-icon>
      </div>
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
