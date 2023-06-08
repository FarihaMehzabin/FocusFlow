import React from "react";
import styles from "./Notifications.module.css";

function Notifications({ tasks, closeNotification }) {
  return (
    <div className={styles.notification}>
      <h2 className={styles.notificationHeader}>Task Reminder 🔔</h2>
      {tasks.map((task, index) => (
        <div key={index} className={styles.task}>
          <h3 className={styles.taskTitle}>{task.title}</h3>
          <p className={styles.taskDateTime}>
            Reminder: {new Date(task.reminder).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}
          </p>
        </div>
      ))}
      <button className={styles.closeButton} onClick={closeNotification}>
        Close
      </button>
    </div>
  );
}




export default Notifications;
