import { useState } from "react";
import { format, parseISO, formatISO, parse } from "date-fns";
import styles from "./TodoList.module.css";
import "react-datepicker/dist/react-datepicker.css";

const Task = ({ item, deleteItem, editItem, moveToFocus, moveToInbox }) => {
  const [editing, setEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(item.title);
  const [editedCategories, setEditedCategories] = useState(
    item.categories ? item.categories.join(" ") : ""
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
        updated_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        title: editedLabel,
        categories: newCategories,
        priority: editedPriority,
      });
    }
    setEditing(!editing);
  };

  const handleMoveToFocus = () => {
    moveToFocus(item); // Call the moveToFocus function and pass the item
  };

  const handleMoveToInbox = () => {
    moveToInbox(item); // Call the moveToFocus function and pass the item
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
                  onChange={(e) =>
                    handlePriorityChange(parseInt(e.target.value))
                  }
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
      <div className={styles.sectionActions}>
        <button onClick={handleMoveToFocus}>Move to Focus</button>
        <button onClick={handleMoveToInbox}>Move to Inbox</button>
      </div>
    </div>
  );
};

export default Task;
