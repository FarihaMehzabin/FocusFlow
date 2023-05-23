import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./JournalEntryPage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const JournalEntryPage = () => {
  const [journalEntriesResponses, setJournalEntriesResponses] = useState([]);
  const router = useRouter();
  const { id, date } = router.query;

  const prompts = [
    "What made you happy today?",
    "What was the most challenging part of your day?",
    "How did you handle stress today?",
    "What can you do to improve your mood?",
    "What are you grateful for?",
    "How can you maintain a positive attitude?",
  ];

  useEffect(() => {
    async function fetchJournalEntriesResponses() {
      try {
        const response = await fetch(`/api/journal-response?id=${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Add additional properties to the entries
        const formattedData = data.map((entry) => ({
          id: entry[0],
          response: entry[1].replace(/^"(.*)"$/, "$1"),
          editMode: false,
          editValue: "",
        }));

        setJournalEntriesResponses(formattedData);
      } catch (error) {
        console.error(
          "There was a problem fetching responses for journal entries:",
          error
        );
      }
    }

    fetchJournalEntriesResponses();
  }, [id]);

  const handleEdit = (id, value) => {
    setJournalEntriesResponses((prevResponses) =>
      prevResponses.map((entry) => {
        if (entry.id === id) {
          entry.editValue = value;
        }
        return entry;
      })
    );
  };

  const handleSave = async (id) => {
    const entry = journalEntriesResponses.find((entry) => entry.id === id);
    if (!entry) {
      return;
    }

    try {
      const response = await fetch(`/api/journal-response?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ response: entry.editValue }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Exit edit mode and update the response in the state
      setJournalEntriesResponses((prevResponses) =>
        prevResponses.map((entry) => {
          if (entry.id === id) {
            entry.response = entry.editValue;
            entry.editMode = false;
          }
          return entry;
        })
      );
    } catch (error) {
      console.error("There was a problem updating the journal entry:", error);
    }
  };

  const setEditMode = (id, mode) => {
    setJournalEntriesResponses((prevResponses) =>
      prevResponses.map((entry) => {
        if (entry.id === id) {
          entry.editMode = mode;
          entry.editValue = entry.response; // start editing with the current response
        }
        return entry;
      })
    );
  };

  return (
    <div className={styles.container}>
      <Link href="/entries">
        <button className={styles.backButton}>BACK</button>
      </Link>
      <h1 className={styles.title}>Journal Entry</h1>
      <h2 className={styles.title}>{date}</h2>
      {journalEntriesResponses.map((entry, index) => {
        return (
          <div className={styles.entry}>
            <h2 className={styles.question}>{prompts[index]}</h2>
            {entry.editMode ? (
              <>
                <input
                  className={styles.inputField}
                  value={entry.editValue}
                  onChange={(e) => handleEdit(entry.id, e.target.value)}
                />
                <Button onClick={() => handleSave(entry.id)}>Save</Button>
              </>
            ) : (
              <>
                <p className={styles.answer}>{entry.response}</p>
                <button
                  className={styles.button}
                  onClick={() => setEditMode(entry.id, true)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default JournalEntryPage;

