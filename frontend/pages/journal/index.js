import { useState } from "react";
import { useRouter } from "next/router";
import MoodSelector from "../../components/Journal/MoodSelector";



export default function Journal() {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const router = useRouter();

  const handleMoodSelect = (moods) => {
    setSelectedMoods(moods);
    router.push({
      pathname: "/journal/prompts",
      query: { initialMoods: moods.join(",") },
    });
  };

  return (
    <div>
      <MoodSelector onMoodSelect={handleMoodSelect} />
    </div>
  );
}
