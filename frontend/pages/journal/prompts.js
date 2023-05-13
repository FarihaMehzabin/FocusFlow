// pages/journal/prompts.js
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import PromptQuestions from "../../components/Journal/PromptQuestions";
import { saveJournalEntry } from "../../lib/storage";


export default function Prompts() {
  const router = useRouter();

  const [initialMoods, setInitialMoods] = useState([]);

  useEffect(() => {
    if (router.query.initialMoods) {
      setInitialMoods(router.query.initialMoods.split(","));
    }
  }, [router.query.initialMoods]);

  // Add your logic to generate prompts based on the selected moods
  const prompts = [
    "What made you happy today?",
    "What was the most challenging part of your day?",
    "How did you handle stress today?",
    "What can you do to improve your mood?",
    "What are you grateful for?",
    "How can you maintain a positive attitude?",
  ];

  const handlePromptSubmit = (answers) => {

    // Save journal entries in local storage
    const journalEntry = {
      initialMoods: router.query.initialMoods,
      date: new Date().toISOString().split("T")[0],
      answers: answers,
    };

    saveJournalEntry(journalEntry);
    
    console.log("Answers:", answers);
    router.push("/journal/end-mood");
  };

  return (
    <div>
      <PromptQuestions prompts={prompts} onSubmit={handlePromptSubmit} />
    </div>
  );
}
