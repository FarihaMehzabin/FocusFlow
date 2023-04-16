import { useState } from "react";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import styles from "./TodoList.module.css";
import "react-datepicker/dist/react-datepicker.css";
import EditModal from "./EditModal";

const Task = ({ item, deleteItem, editItem }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

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
              ✍️
            </i>
          </button>
          {showEditModal && (
            <div className={styles.dropdownContainer}>
              <EditModal
                item={item}
                editItem={editItem}
                closeModal={() => setShowEditModal(false)}
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Task;
