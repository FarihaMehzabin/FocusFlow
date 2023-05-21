import styles from "./JournalEntry.module.css";
import React from "react";
import { useRouter } from "next/router";

function JournalEntry({ entry}) {
  const router = useRouter();
  
  return (
    <div className={styles.entryContainer}>
      <div className={styles.dateContainer}>
        <span className={styles.date}>
          {new Date(entry.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className={styles.resultingFeeling}>{entry.resulted_mood}</span>
      </div>

      <div className={styles.moodContainer}>
        <p>Initial Moods </p>
        {entry.initial_moods && entry.initial_moods.includes(",") ? (
          entry.initial_moods.split(",").map((mood, index) => (
            <React.Fragment key={mood.trim()}>
              <span>{mood.trim()}</span>
              {index < entry.initial_moods.split(",").length - 1}
            </React.Fragment>
          ))
        ) : (
          <span>{entry.initial_moods}</span>
        )}
      </div>

      <div className={styles.buttonsContainer}>
        <button
          className={styles.entryContent}
          onClick={() => {
            router.push({
              pathname: `/entries/${entry.id}`,
              query: { date: entry.created_at },
            });
          }}
        >
          Click to view
        </button>

        
      </div>
    </div>
  );
}

export default JournalEntry;
