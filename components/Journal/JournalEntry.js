import styles from "./JournalEntry.module.css";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function JournalEntry({ entry, onEdit, onDelete }) {
  const router = useRouter();
  
  return (
    <div className={styles.entryContainer}>
      <span>{entry.resultingFeeling} </span>
      <span className={styles.date}>{entry.date}</span>
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
  );
}

export default JournalEntry;
