import { useState } from "react";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import styles from "./TodoList.module.css";
import "react-datepicker/dist/react-datepicker.css";

const Task = ({ item, deleteItem, editItem }) => {
  const handleEdit = () => {
    const newLabel = prompt("Edit the task:", item.label);
    if (newLabel) {
      editItem({ ...item, label: newLabel });
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminderDate, setReminderDate] = useState(
    item.reminderDate ? new Date(item.reminderDate) : null
  );

  const handleSetReminder = (date) => {
    setReminderDate(date);
    setShowDatePicker(false);
    const updatedItem = {
      ...item,
      reminder: { date: date.toISOString(), time: format(date, "HH:mm") },
    };
    editItem(updatedItem);
  };

  const formattedTime = item.reminder.time
    ? format(parse(item.reminder.time, "HH:mm", new Date()), "h:mm a")
    : "";

  const reminderDateTime = item.reminder.date
    ? `${format(new Date(item.reminder.date), "PP")} at ${formattedTime}`
    : "Not Set";

      console.log(reminderDateTime)

  return (
    <li className={styles.taskItem}>
      <div className={styles.taskContent}>
        <span className={styles.label}>{item.label}</span>
        <div className={styles.categories}>
          {item.categories.map((category, index) => (
            <span key={index} className={styles.category}>
              {category}
            </span>
          ))}
        </div>
        <div className={styles.reminder}>
          <span>
            Reminder: {reminderDateTime ? reminderDateTime : "Not Set"}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.btnPicto}
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          📅
        </button>
        {showDatePicker && (
          <div className={styles.datePickerWrapper}>
            <DatePicker
              selected={reminderDate}
              onChange={handleSetReminder}
              showTimeSelect
              dateFormat="Pp"
              inline
            />
          </div>
        )}
        <button
          className={styles.btnPicto}
          type="button"
          onClick={() => deleteItem(item)}
          aria-label="Delete"
          title="Delete"
        >
          <i aria-hidden="true" className="material-icons">
            ❌
          </i>
        </button>
        <button
          className={styles.btnPicto}
          type="button"
          onClick={handleEdit}
          aria-label="Edit"
          title="Edit"
        >
          <i aria-hidden="true" className="material-icons">
            ✍️
          </i>
        </button>
      </div>
    </li>
  );
};

export default Task;
