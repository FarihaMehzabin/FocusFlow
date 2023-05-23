import { useState } from "react";
import styles from "./ZenZone.module.css";
import Sidebar from "/components/Sidebar";

const ZenZone = () => {
  const lofiData = [
    { name: "Calming", files: ["file1.mp3", "file2.mp3"] },
    { name: "Stress Reliever", files: ["file3.mp3", "file4.mp3"] },
    // More lofi data...
  ];

  const meditationData = [
    { name: "Peaceful", files: ["file5.mp3", "file6.mp3"] },
    { name: "Mindfulness", files: ["file7.mp3", "file8.mp3"] },
    // More meditation data...
  ];

  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleClick = (files) => {
    setSelectedFiles(files);
  };
  return (
    <div className={styles.zenContainer}>
        <Sidebar/>
    <div className={styles.container}>
      <h1 className={styles.header}>Zen Zone</h1>
      <h2 className={styles.header}>LoFi</h2>
      {lofiData.map((card) => (
        <div
          key={card.name}
          className={styles.card}
          onClick={() => handleClick(card.files)}
        >
          {card.name}
        </div>
      ))}
      <h2 className={styles.header}>Meditation</h2>
      {meditationData.map((card) => (
        <div
          key={card.name}
          className={styles.card}
          onClick={() => handleClick(card.files)}
        >
          {card.name}
        </div>
      ))}
      {selectedFiles && (
        <ul className={styles.selectedFiles}>
          <h2 className={styles.header}>Selected Files</h2>
          {selectedFiles.map((file, index) => (
            <li key={index} className={styles.selectedFilesItem}>
              {file}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default ZenZone;
