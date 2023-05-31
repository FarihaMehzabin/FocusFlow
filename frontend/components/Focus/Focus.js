import React, { useState, useEffect } from "react";
import styles from "./Focus.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { countdown, reset } from "./utils/FocusUtils";
import Sidebar from "/components/Sidebar";

const Focus = ({user_id}) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(true);
  const [timerType, setTimerType] = useState("Pomodoro");
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [chosenTask, setChosenTask] = useState("");
  const [taskID, setTaskID] = useState("");
  const [tasks, setTasks] = useState([]);





  const [inputMinutes, setInputMinutes] = useState("");

  const handleCustomTime = () => {
    setPause(true);
    setTimerType("Custom");
    const customMinutes = parseInt(inputMinutes, 10);
    setInitialTime(customMinutes * 60);
    setMinutes(customMinutes);
    setSeconds(0);
  };

  const handleInputChange = (e) => {
    setInputMinutes(e.target.value);
  };


  const handleTimerType = (type, mins) => {
    setPause(true);
    setTimerType(type);
    setInitialTime(mins * 60);
    setMinutes(mins);
    setSeconds(0);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        `/api/items?user_id=${user_id}&section=Focus`
      );
      const data = await response.json();

      setTasks(data); // populate tasks state variable

      if (data.length > 0) {
        setChosenTask(data[0].title);
        setTaskID(data[0].id);
      } else {
        setChosenTask("No task set. Choose a task to focus on from Today!");
      }
    };
    fetchTasks();

    console.log(chosenTask);
  }, [user_id]);

  const handleStartPause = () => {
    setPause(!pause);
  };

  const handleTaskCompleted = async (taskId) => {
    await fetch(`/api/task-completed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId }), 
    });
    setChosenTask("No task set");
  };

  const handleChangeSections = async (id, from, to) => {
    await fetch(`/api/change-sections?from=${from}&to=${to}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }), 
    });
    setChosenTask("No task set");
  };

  useEffect(() => {
    const task = tasks.find((task) => task.id === taskID);
    if (task) {
      setChosenTask(task.title);
    } else {
      setChosenTask("No task set. Choose a task to focus on from Today!");
    }
  }, [taskID, tasks]);



useEffect(() => {
  if (!pause) {
    const cleanup = countdown(
      setMinutes,
      setSeconds,
      pause,
      taskID,
      handleTaskCompleted,
      () => setPause(true)
    );
    return () => cleanup();
  }
}, [pause, setMinutes, setSeconds, taskID, handleTaskCompleted]);

const convertPriority = (priority) => {
  switch (priority) {
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    default:
      return "Unknown";
  }
};


  return (
    <div className={styles.Root}>
      <Sidebar />
      <div className={styles.timer}>
        <div className={styles.chosenTaskLabel}>
          <h2>Currently focusing on</h2>
        </div>
        <h4 className={styles.chosenTask}>{chosenTask}</h4>
        {chosenTask !==
          "No task set. Choose a task to focus on from Today!" && (
          <div className={styles.actions}>
            <button onClick={() => handleTaskCompleted(taskID)}>
              Mark Task as Completed
            </button>
            <button
              onClick={() => handleChangeSections(taskID, "Focus", "Today")}
            >
              Move to Today
            </button>
            <button
              onClick={() => handleChangeSections(taskID, "Focus", "Inbox")}
            >
              Move to Inbox
            </button>
          </div>
        )}

        <select
          className={styles.select}
          value={taskID}
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            setTaskID(selectedId);
            const selectedTask = tasks.find((task) => task.id === selectedId);
            setChosenTask(selectedTask ? selectedTask.title : "");
            // Resetting the timer
            setPause(true);
            setMinutes(25);
            setSeconds(0);
          }}
        >
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title} - Priority: {convertPriority(task.priority)}
            </option>
          ))}
        </select>

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
            Work
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
          <CircularProgressbar
            value={((minutes * 60 + seconds) / initialTime) * 100}
            text={`${minutes < 10 ? "0" : ""}${minutes}:${
              seconds < 10 ? "0" : ""
            }${seconds}`}
            strokeWidth={5}
            styles={{
              path: {
                stroke: "white",
              },
              text: {
                fontSize: "20px",
                fontWeight: 500,
                fill: "white",
              },
            }}
          />
        </div>
        <div className={styles.startBtn} onClick={handleStartPause}>
          {pause ? "Start" : "Pause"}
        </div>
      </div>
    </div>
  );
};

export default Focus;
