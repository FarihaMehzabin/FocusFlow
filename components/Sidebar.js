import React from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/sections/inbox" className={styles.link}>
            Inbox
          </Link>
        </li>
        <li>
          <Link href="/sections/today" className={styles.link}>
            Today
          </Link>
        </li>
        <li>
          <Link href="/sections/focus" className={styles.link}>
            Focus
          </Link>
        </li>
        <li>
          <a className={styles.link}>Zen Zone</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
