import { useState } from "react";
import { useRouter } from "next/router";
import MoodSelector from "../../components/Journal/MoodSelector";



export default function Journal() {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const router = useRouter();
  
  const userId = router.query.user_id;


  const handleMoodSelect = (moods) => {
    setSelectedMoods(moods);

    console.log("Initial Moods: " + moods.join(","));

    router.push({
      pathname: "/journal/prompts",
      query: { initialMoods: moods.join(",") , user_id: userId },
    });
  };

  return (
    <div>
      <MoodSelector onMoodSelect={handleMoodSelect} />
    </div>
  );
}
