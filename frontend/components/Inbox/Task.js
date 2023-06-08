import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import styles from "./TodoList.module.css";
import "react-datepicker/dist/react-datepicker.css";

const Task = ({ item, deleteItem, editItem, moveToToday }) => {
  const [editing, setEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(item.title);
  const [editedCategories, setEditedCategories] = useState(
    item.categories ? item.categories.join(" ") : ""
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminder, setReminder] = useState(
    item.reminder ? new Date(item.reminder) : null
  );
  const [editedPriority, setEditedPriority] = useState(item.priority);

  const priorityMapping = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

   const handlePriorityChange = (value) => {
     setEditedPriority(value);
   };

  const handleEdit = () => {
    if (editing) {
      const newCategories =
        editedCategories.trim() !== "" ? editedCategories.split(",") : ["Task"];
      editItem({
        ...item,
        updated_at: format(new Date(), "yyyy-MM-dd HH:mm"),
        title: editedLabel,
        categories: newCategories,
        priority: editedPriority,
      });
    }
    setEditing(!editing);
  };


  const handleSetReminder = (date) => {
    setReminder(date);
    setShowDatePicker(false);

    const updatedItem = {
      ...item,
      updated_at: format(new Date(), "yyyy-MM-dd HH:mm"),
      reminder: format(date, "yyyy-MM-dd HH:mm"),
    };
    editItem(updatedItem);
  };

const reminderDate = item.reminder
  ? new Date(item.reminder).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  : "Not Set";


  const handleMoveToToday = () => {
    moveToToday(item);
  };

return (
  <div>
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
          <span>Reminder: {reminderDate}</span>
        </div>

        <div className={styles.prioritySlider}>
          {editing && (
            <>
              <label htmlFor="priority" className={styles.formLabel}>
                Priority
              </label>
              <input
                type="range"
                name="priority"
                id="priority"
                value={editedPriority}
                min="1"
                max="3"
                onChange={(e) => handlePriorityChange(parseInt(e.target.value))}
                className={styles.sliderInput}
              />
              <div className={styles.sliderLabels}>
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </>
          )}
          {!editing && (
            <div
              className={`${styles.priority} ${
                styles[priorityMapping[editedPriority].toLowerCase()]
              }`}
            >
              {priorityMapping[editedPriority]}
            </div>
          )}
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
              selected={reminder}
              onChange={handleSetReminder}
              timeIntervals={1}
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
              {editing ? "💾" : "📝"}
            </i>
          </button>
        </div>
      </div>
    </li>
    <div className={styles.sectionActions}>
      <button onClick={handleMoveToToday}>Move to Today</button>
    </div>
  </div>
);
          }

export default Task;
