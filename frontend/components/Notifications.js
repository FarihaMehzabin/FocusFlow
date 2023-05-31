import React from "react";
import styles from "./Notifications.module.css";

function Notifications({ tasks, closeNotification }) {

  console.log("Notifications component reached");
  return (
    <div className={styles.notification}>
      <h2>Task Reminders 🔔</h2>
      {tasks.map((task, index) => (
        <div key={index}>
          <h3>{task.title}</h3>
        </div>
      ))}
      <button onClick={closeNotification}>Close</button>
    </div>
  );
}

export default Notifications;
