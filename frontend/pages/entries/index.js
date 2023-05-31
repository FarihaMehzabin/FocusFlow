import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import Link from "next/link";
import JournalList from "../../components/Journal/JournalList";
import Sidebar from "../../components/Sidebar";
import { getJournalEntries, deleteJournalEntry } from "../../lib/storage";
import styles from "./index.module.css";

function Journal({ isLoggedIn, user_id }) {
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  if (!isLoggedIn) {
    return <div>Not authorized</div>;
  }

  useEffect(() => {
    async function fetchJournalEntries() {
      try {
        const response = await fetch(`/api/journal?user_id=${user_id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setJournalEntries(data);

        console.log("Inside Journal entries index page ", journalEntries);
      } catch (error) {
        console.error("There was a problem fetching journal entries:", error);
      }
    }

    fetchJournalEntries();
  }, [user_id]);

  const handleDeleteEntry = (id) => {
    deleteJournalEntry(id);
  };

  const filteredEntries = journalEntries.filter((entry) => {
    if (selectedMood && selectedDate) {
      return (
        entry.initial_moods.includes(selectedMood) &&
        entry.created_at === selectedDate
      );
    } else if (selectedMood) {
      return entry.initial_moods.includes(selectedMood);
    } else if (selectedDate) {
      return entry.created_at === selectedDate;
    } else {
      return true;
    }
  });

  console.log(filteredEntries);

  return (
    <div className={styles.Root}>
      <Sidebar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Journal Entries</h1>
        <Link href="/journal">
          <button className={styles.addJournalButton}>
            Start a new journal
          </button>
        </Link>
        <Link href="/sections/journal">
          <button className={styles.backButton}>BACK</button>
        </Link>

        <JournalList
          entries={filteredEntries}
          onDelete={handleDeleteEntry}
          user_id={user_id}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const guid = cookies.session;

  console.log("cookies" + cookies.session);

  // Make a request to your Flask server to check if the GUID is valid
  const res = await fetch(
    `http://127.0.0.1:8082/check-cookie-validity/${guid}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  const data = await res.json();

  if (!data.valid) {
    // Redirect to login page if the GUID is not valid
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { isLoggedIn: true, user_id: data.user_id },
  };
}

export default Journal;
