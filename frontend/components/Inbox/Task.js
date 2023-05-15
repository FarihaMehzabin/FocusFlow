import { useState } from "react";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import styles from "./TodoList.module.css";
import "react-datepicker/dist/react-datepicker.css";


const Task = ({ item, deleteItem, editItem }) => {

  const [editing, setEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(item.label);
  const [editedCategories, setEditedCategories] = useState(
    item.categories ? item.categories.join(" ") : ""
  );

  console.log(item)


  const handleEdit = () => {
    if (editing) {
      const newCategories =
        editedCategories.trim() !== "" ? editedCategories.split(" ") : ["Task"];
      editItem({
        ...item,
        updated_at: new Date().toISOString().replace("T", " ").slice(0, 19),
        title: editedLabel,
        categories: newCategories,
      });
    }
    setEditing(!editing);
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminder, setReminder] = useState(
    item.reminder ? new Date(item.reminder) : null
  );

  const handleSetReminder = (date) => {
    setReminder(date);
    setShowDatePicker(false);
    const updatedItem = {
      ...item,
      reminder: { date: date.toISOString() },
    };
    editItem(updatedItem);
  };


  const reminderDate = item.reminder
    ? `${format(new Date(item.reminder), "PP")}`
    : "Not Set";

      console.log(reminderDate)

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
          <span className={styles.label}>{item.title}</span>
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
            Reminder: {reminderDate ? reminderDate : "Not Set"}
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
