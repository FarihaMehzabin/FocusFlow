import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PromptQuestions from "../../components/Journal/PromptQuestions";
import EndMoodSelector from "../../components/Journal/EndMoodSelector";


export default function Prompts() {
  const router = useRouter();
  const [initialMoods, setInitialMoods] = useState([]);
  const [answers, setAnswers] = useState(null);
  const [endMoodSelected, setEndMoodSelected] = useState(false);
  const [journalEntry, setJournalEntry] = useState({});

  useEffect(() => {
    if (router.query.initialMoods) {
      setInitialMoods(router.query.initialMoods.split(","));
    }
  }, [router.query.initialMoods]);

  const prompts = [
    "What made you happy today?",
    "What was the most challenging part of your day?",
    "How did you handle stress today?",
    "What can you do to improve your mood?",
    "What are you grateful for?",
    "How can you maintain a positive attitude?",
  ];


  const handlePromptSubmit = (answers) => {
    const newEntry = {
      initialMoods: router.query.initialMoods,
      created_at: new Date().toISOString().split("T")[0],
      responses: answers,
      user_id: router.query.user_id
    };

    console.log("Answers:", answers);
    setJournalEntry(newEntry);
    setAnswers(answers);
    setEndMoodSelected(true);
  };

  const handleMoodSelect = async (selectedMoods) => {
  

    const updatedEntry = {
      ...journalEntry,
      resulted_mood: getFeelingEmoji(selectedMoods[0]),
    };

    console.log("Final journal entry: ", updatedEntry);

    try {
      const response = await fetch("/api/journal", {
        // use await here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedEntry }),
      });

      if (!response.ok) {
        // check if the response was not ok
        throw new Error("Error adding item.");
      }

      const data = await response.json(); 
      
    } catch (error) {
      console.error("An error occurred while adding the item:", error);
    }

    router.push("/sections/journal");
  };

  const getFeelingEmoji = (feeling) => {
    switch (feeling) {
      case "Feeling better":
        return "⬆️";
      case "Neutral":
        return "😐";
      case "Don't feel well":
        return "⬇️";
      default:
        return "";
    }
  };

  return (
    <div>
      {endMoodSelected ? (
        <EndMoodSelector onMoodSelect={handleMoodSelect} />
      ) : (
        <PromptQuestions prompts={prompts} onSubmit={handlePromptSubmit} />
      )}
    </div>
  );
}
