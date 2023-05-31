import { useState } from "react";
import styles from "./TodoList.module.css";

const AddToInbox = ({ addItem }) => {
  const [newItem, setNewItem] = useState("");
  const [categories, setCategories] = useState("");
  const [priority, setPriority] = useState(2); // Initial priority value

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemCategories =
      categories.trim() !== "" ? categories.split(",") : [];
    addItem(newItem, itemCategories, priority);
    setNewItem("");
    setCategories("");
    setPriority(2); // Reset priority after submitting
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="newitem" className={styles.formLabel}>
        Add New Task
      </label>
      <input
        type="text"
        name="newitem"
        id="newitem"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        className={styles.formInput}
      />
      <label htmlFor="categories" className={styles.formLabel}>
        Categories (separated by commas)
      </label>
      <input
        type="text"
        name="categories"
        id="categories"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        className={styles.formInput}
      />
      <div className={styles.prioritySlider}>
        <label htmlFor="priority" className={styles.formLabel}>
          Priority
        </label>
        <input
          type="range"
          name="priority"
          id="priority"
          value={priority}
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
      </div>
      <div className={styles.formSubmitBtn}>
        <button type="submit" className={styles.formButton}>
          Add item
        </button>
      </div>
    </form>
  );
};

export default AddToInbox;
