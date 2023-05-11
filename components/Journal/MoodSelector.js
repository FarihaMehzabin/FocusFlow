import { useState } from "react";
import styles from "./MoodSelector.module.css";

const allMoods = [
  "😁 Happy",
  "😔 Sad",
  "😡 Angry",
  "😰 Anxious",
  "😣 Stressed",
  "😌 Calm",
  "😄 Motivated",
  "😮‍💨 Tired",
  "🤩 Excited",
  "🥱 Bored",
  "😐 Confused",
  "😌 Content",
  "😖 Frustrated",
  "🧘 Relaxed",
  "🙁 Lonely",
  "😥 Overwhelmed",
];

export default function MoodSelector({ onMoodSelect }) {
  const [selectedMoods, setSelectedMoods] = useState([]);

  const handleMoodClick = (mood) => {
    let newSelectedMoods;
    if (selectedMoods.includes(mood)) {
      newSelectedMoods = selectedMoods.filter(
        (selectedMood) => selectedMood !== mood
      );
    } else {
      if (selectedMoods.length >= 6) return;
      newSelectedMoods = [...selectedMoods, mood];
    }
    setSelectedMoods(newSelectedMoods);
  };

  const handleSubmit = () => {
    onMoodSelect(selectedMoods);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Your Moods</h1>
      <div className={styles.row}>
        <div className={styles.column}>
          {allMoods.slice(0, 8).map((mood, index) => (
            <button
              key={mood}
              className={`${styles["mood-button"]} ${
                selectedMoods.includes(mood) ? styles.selected : ""
              }`}
              onClick={() => handleMoodClick(mood)}
            >
               {mood}
            </button>
          ))}
        </div>
        <div className={styles.column}>
          {allMoods.slice(8, 16).map((mood, index) => (
            <button
              key={mood}
              className={`${styles["mood-button"]} ${
                selectedMoods.includes(mood) ? styles.selected : ""
              }`}
              onClick={() => handleMoodClick(mood)}
            >
               {mood}
            </button>
          ))}
        </div>
      </div>
      <button className={styles["done-button"]} onClick={handleSubmit}>
        Done
      </button>
    </div>
  );
}
