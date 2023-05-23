import { useState } from "react";
import styles from "./TodoList.module.css";

const AddToInbox = ({ addItem }) => {
  const [newItem, setNewItem] = useState("");
  const [categories, setCategories] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();
  const itemCategories = categories.trim() !== "" ? categories.split(",") : [];
  addItem(newItem, itemCategories);
  setNewItem("");
  setCategories("");
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
      <div className={styles.formSubmitBtn}>
        <button type="submit" className={styles.formButton}>
        Add item
      </button>
      </div> 
    </form>
  );
};

export default AddToInbox;
