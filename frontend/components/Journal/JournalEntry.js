import styles from "./JournalEntry.module.css";
import React from "react";
import { useRouter } from "next/router";

function JournalEntry({ entry, onEdit, onDelete }) {
  const router = useRouter();
  
  return (
    <div className={styles.entryContainer}>
      <div className={styles.dateContainer}>
        <span className={styles.date}>
          {new Date(entry.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className={styles.resultingFeeling}>{entry.resultingFeeling}</span>
      </div>

      <div className={styles.moodContainer}>
        <p>Initial Moods: </p>
        {entry.initialMoods && entry.initialMoods.includes(",") ? (
          entry.initialMoods.split(",").map((mood, index) => (
            <React.Fragment key={mood.trim()}>
              <span>{mood.trim()}</span>
              {index < entry.initialMoods.split(",").length - 1}
            </React.Fragment>
          ))
        ) : (
          <span>{entry.initialMoods}</span>
        )}
      </div>

      <div className={styles.buttonsContainer}>
        <button
          className={styles.entryContent}
          onClick={() => {
            router.push({
              pathname: `/entries/${entry.id}`,
              query: { answers: JSON.stringify(entry.answers) },
            });
          }}
        >
          Click to view
        </button>

        <div className={styles.buttons}>
          <button
            className={`${styles.entryButton} ${styles.edit}`}
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className={`${styles.entryButton} ${styles.delete}`}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JournalEntry;
