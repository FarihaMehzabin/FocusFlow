import JournalEntry from "./JournalEntry";
import styles from "./JournalList.module.css";


function JournalList({ entries, onEdit, onDelete }) {
  return (
    <div className={styles.Root}>
      <div className={styles.container}>
        {entries.length === 0 ? (
          <p>No records found</p>
        ) : (
          entries.map((entry, index) => (
            <JournalEntry
              key={index}
              entry={entry}
              onEdit={() => onEdit(index)}
              onDelete={() => onDelete(index)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default JournalList;
