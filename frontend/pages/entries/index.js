import { useState, useEffect } from 'react';
import Link from "next/link";
import JournalList from "../../components/Journal/JournalList";
import Sidebar from "../../components/Sidebar";
import { getJournalEntries, deleteJournalEntry } from '../../lib/storage';
import styles from './index.module.css';

function Journal() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setJournalEntries(getJournalEntries());
    
  }, []);

  const handleDeleteEntry = (id) => {
    deleteJournalEntry(id);
  };

const filteredEntries = journalEntries
  .filter((entry) => {
    if (selectedMood && selectedDate) {
      return (
        entry.initialMoods.includes(selectedMood) && entry.date === selectedDate
      );
    } else if (selectedMood) {
      return entry.initialMoods.includes(selectedMood);
    } else if (selectedDate) {
      return entry.date === selectedDate;
    } else {
      return true;
    }
  })
  


  console.log(filteredEntries)

  return (
     <div className={styles.Root}>
      <Sidebar />
    <div className={styles.container}>
      <h1 className={styles.heading}>Journal Entries</h1>
      <Link href="/">
        <button className={styles.addJournalButton}>Start a new journal</button>
      </Link>

      <div className={styles.filters}>
        <label className={styles.label}>
          Filter by mood:
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            <option value="">All moods</option>
            <option value="😁 Happy">😁 Happy</option>
            <option value="😔 Sad">😔 Sad</option>
            <option value="😡 Angry">😡 Angry</option>
            <option value="😰 Anxious">😰 Anxious</option>
            <option value="😣 Stressed">😣 Stressed</option>
            <option value="😌 Calm">😌 Calm</option>
            <option value="😄 Motivated">😄 Motivated</option>
            <option value="😮‍💨 Tired">😮‍💨 Tired</option>
            <option value="🤩 Excited">🤩 Excited</option>
            <option value="Bored">🥱 Bored</option>
            <option value="🥱 Confused">😐 Confused</option>
            <option value="😌 Content">😌 Content</option>
            <option value="😖 Frustrated">😖 Frustrated</option>
            <option value="🧘 Relaxed">🧘 Relaxed</option>
            <option value="🙁 Lonely">🙁 Lonely</option>
            <option value="😥 Overwhelmed">😥 Overwhelmed</option>
          </select>
        </label>
        <label className={styles.label}>
          Filter by date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </div>

      <JournalList entries={filteredEntries} onDelete={handleDeleteEntry} />
    </div>
    </div>
  );
}

export default Journal;
