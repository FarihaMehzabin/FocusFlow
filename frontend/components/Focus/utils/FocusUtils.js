// FocusUtils.js
export function countdown(setMinutes, setSeconds, pause, onComplete) {
  if (pause) return;

  const intervalId = setInterval(() => {
    setSeconds((seconds) => {
      if (seconds === 0) {
        setMinutes((minutes) => {
          if (minutes > 0) {
            return minutes - 1;
          }
          onComplete();
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
