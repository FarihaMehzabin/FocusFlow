import { useRouter } from "next/router";
import EndMoodSelector from "../../components/Journal/EndMoodSelector";
import { getJournalEntries, updateJournalEntry } from "../../lib/storage";

export default function EndMood() {
  const router = useRouter();

  const handleMoodSelect = (selectedMoods) => {
    const journalEntries = getJournalEntries();
    const lastIndex = journalEntries.length - 1;
    const updatedEntry = {
      ...journalEntries[lastIndex],
      resultingFeeling: getFeelingEmoji(selectedMoods[0]), // Assuming single resulting mood is selected
    };

    updateJournalEntry(lastIndex, updatedEntry);
    router.push("/");
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
      <EndMoodSelector onMoodSelect={handleMoodSelect} />
    </div>
  );
}
