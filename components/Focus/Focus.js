import React, { useState, useEffect } from "react";
import styles from "./Focus.module.css";
import { countdown, reset } from "./utils/FocusUtils";

const Focus = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(true);
  const [timerType, setTimerType] = useState("Pomodoro");

  useEffect(() => {
    if (!pause) {
      const cleanup = countdown(setMinutes, setSeconds, pause, () =>
        setPause(true)
      );
      return () => cleanup();
    }
  }, [pause, setMinutes, setSeconds]);


  const [inputMinutes, setInputMinutes] = useState("");

  const handleCustomTime = () => {
    setPause(true);
    setTimerType("Custom");
    setMinutes(parseInt(inputMinutes, 10));
    setSeconds(0);
  };

  const handleInputChange = (e) => {
    setInputMinutes(e.target.value);
  };


  const handleTimerType = (type, mins) => {
    setPause(true);
    setTimerType(type);
    setMinutes(mins);
    setSeconds(0);
  };

  const handleStartPause = () => {
    setPause(!pause);
  };

  return (
    <div className={styles.timer}>
      <div className={styles.customTime}>
        <label htmlFor="customTimeInput">Custom Time (minutes):</label>
        <input
          type="number"
          min="1"
          id="customTimeInput"
          value={inputMinutes}
          onChange={handleInputChange}
        />
        <button onClick={handleCustomTime}>Set Custom Time</button>
      </div>

      <div className={styles.buttons}>
        <div
          className={`${styles.button} ${
            timerType === "Pomodoro" ? styles.selected : ""
          }`}
          onClick={() => handleTimerType("Pomodoro", 25)}
        >
          Pomodoro
        </div>
        <div
          className={`${styles.button} ${
            timerType === "Short Break" ? styles.selected : ""
          }`}
          onClick={() => handleTimerType("Short Break", 5)}
        >
          Short Break
        </div>
        <div
          className={`${styles.button} ${
            timerType === "Long Break" ? styles.selected : ""
          }`}
          onClick={() => handleTimerType("Long Break", 15)}
        >
          Long Break
        </div>
      </div>
      <div className={styles.countdown}>
        {`${minutes < 10 ? "0" : ""}${minutes}:${
          seconds < 10 ? "0" : ""
        }${seconds}`}
      </div>
      <div className={styles.startBtn} onClick={handleStartPause}>
        {pause ? "Start" : "Pause"}
      </div>
    </div>
  );
};

export default Focus;
