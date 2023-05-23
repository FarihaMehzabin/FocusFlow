import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import styles from "./ZenZone.module.css";
import Sidebar from "/components/Sidebar";

// Initialize spotifyApi
const spotifyApi = new SpotifyWebApi({
  clientId: "YOUR_SPOTIFY_CLIENT_ID",
  clientSecret: "YOUR_SPOTIFY_CLIENT_SECRET",
  redirectUri: "YOUR_SPOTIFY_REDIRECT_URI",
});

const ZenZone = () => {
  const lofiData = [
    { name: "Calming", spotifyId: "5nTtCOCds6I0PHMNtqelas" },
    { name: "Stress Reliever", spotifyId: "2YpeDb67231RjR0MgVLzsG" },
    // More lofi data...
  ];

  const meditationData = [
    { name: "Peaceful", files: ["file5.mp3", "file6.mp3"] },
    { name: "Mindfulness", files: ["file7.mp3", "file8.mp3"] },
    // More meditation data...
  ];

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleClick = (card) => {
    if (card.spotifyId) {
      // For LoFi cards, get track from Spotify
      spotifyApi.setAccessToken("YOUR_ACCESS_TOKEN");
      spotifyApi.getTrack(card.spotifyId).then(
        function (data) {
          setCurrentTrack(data.body);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    } else {
      // For meditation cards, use local files
      setSelectedFiles(card.files);
    }
  };

  return (
    <div className={styles.zenContainer}>
      <Sidebar />
      <div className={styles.container}>
        <h1 className={styles.header}>Zen Zone</h1>
        <h2 className={styles.header}>LoFi</h2>
        {lofiData.map((card) => (
          <div
            key={card.name}
            className={styles.card}
            onClick={() => handleClick(card)}
          >
            {card.name}
          </div>
        ))}
        <h2 className={styles.header}>Meditation</h2>
        {meditationData.map((card) => (
          <div
            key={card.name}
            className={styles.card}
            onClick={() => handleClick(card)}
          >
            {card.name}
          </div>
        ))}
        {currentTrack && (
          <iframe
            src={`https://open.spotify.com/embed/track/${currentTrack.id}`}
            width="300"
            height="380"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          />
        )}
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
