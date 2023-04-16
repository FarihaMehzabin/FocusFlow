import React, { useState } from "react";
import styles from "./EditModal.module.css";

const EditModal = ({ item, editItem, closeModal }) => {
  const [label, setLabel] = useState(item.label);
  const [categories, setCategories] = useState(item.categories.join(" "));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategories =
      categories.trim() !== "" ? categories.split(" ") : ["Task"];
    editItem({ ...item, label, categories: newCategories });
    closeModal();
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownContent}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="taskName">Task name:</label>
          <input
            type="text"
            id="taskName"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <label htmlFor="categories">Categories:</label>
          <input
            type="text"
            id="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
