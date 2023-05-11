import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./PromptQuestions.module.css";

export default function PromptQuestions({ prompts, onSubmit }) {
  const [answers, setAnswers] = useState(Array(prompts.length).fill(""));

  const router = useRouter();

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Answer the following prompts:</h2>
      <div className={styles["all-prompts-container"]}>
        {prompts.map((prompt, index) => (
          <div key={index} className={styles["prompt-container"]}>
            <h3 className={styles["prompt-question"]}>{prompt}</h3>
            <textarea
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              rows="3"
              cols="30"
              style={{ width: "100%", resize: "none", height: "8rem" }}
            />
          </div>
        ))}
      </div>
      <button className={styles["submit-button"]} onClick={handleSubmit}>
        Done
      </button>
    </div>
  );
}
