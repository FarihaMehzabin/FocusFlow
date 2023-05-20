import { useState } from "react";
import styles from "./EndMoodSelector.module.css";
import Sidebar from "/components/Sidebar";

export default function EndMoodSelector({ onMoodSelect }) {
  const [selectedMood, setSelectedMood] = useState("");

  const handleChange = (e) => {
    setSelectedMood(e.target.value);
    onMoodSelect([e.target.value]);
  };

  return (
    <div className={styles.Root}>
      <Sidebar/>
    <div className={styles.container}>
      <h2 className={styles.heading}>How are you feeling now?</h2>
      <label htmlFor="end-mood" className={styles.label}>
        Choose your mood:
        <select
          id="end-mood"
          value={selectedMood}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Select a mood</option>
          <option value="Feeling better">Feeling better</option>
          <option value="Neutral">Neutral</option>
          <option value="Don't feel well">Don't feel well</option>
        </select>
      </label>
    </div>
    </div>
  );
}
