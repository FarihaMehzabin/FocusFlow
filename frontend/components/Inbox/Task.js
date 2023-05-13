import { useState } from "react";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import styles from "./TodoList.module.css";
import "react-datepicker/dist/react-datepicker.css";


const Task = ({ item, deleteItem, editItem }) => {

  const [editing, setEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(item.label);
  const [editedCategories, setEditedCategories] = useState(
    item.categories.join(" ")
  );


  const handleEdit = () => {
    if (editing) {
      const newCategories =
        editedCategories.trim() !== "" ? editedCategories.split(" ") : ["Task"];
      editItem({ ...item, label: editedLabel, categories: newCategories });
    }
    setEditing(!editing);
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
        {editing ? (
          <input
            type="text"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
          />
        ) : (
          <span className={styles.label}>{item.label}</span>
        )}
        {editing ? (
          <input
            type="text"
            value={editedCategories}
            onChange={(e) => setEditedCategories(e.target.value)}
          />
        ) : (
          <div className={styles.categories}>
            {item.categories.map((category, index) => (
              <span key={index} className={styles.category}>
                {category}
              </span>
            ))}
          </div>
        )}
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
        <div style={{ position: "relative" }}>
          <button
            className={styles.btnPicto}
            type="button"
            onClick={handleEdit}
            aria-label="Edit"
            title="Edit"
          >
            <i aria-hidden="true" className="material-icons">
              {editing ? "💾" : "✍️"}
            </i>
          </button>
          
        </div>
      </div>
    </li>
  );
};

export default Task;
