// FocusUtils.js
export function countdown(
  setMinutes,
  setSeconds,
  pause,
  taskID,
  handleTaskCompleted,
  onComplete
) {
  if (pause) return;

  const intervalId = setInterval(() => {
    setSeconds((seconds) => {
      if (seconds === 0) {
        setMinutes((minutes) => {
          if (minutes > 0) {
            return minutes - 1;
          }
          onComplete();
          // When the countdown ends, show a confirmation dialog to the user
          if (
            window.confirm(
              "Timer is over! Do you want to mark the task as completed?"
            )
          ) {
            handleTaskCompleted(taskID);
          }
          clearInterval(intervalId);
          return 0;
        });
        return 59;
      } else {
        return seconds - 1;
      }
    });
  }, 1000);

  return () => clearInterval(intervalId);
}
