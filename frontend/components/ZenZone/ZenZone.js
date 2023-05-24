import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import styles from "./ZenZone.module.css";
import Sidebar from "/components/Sidebar";

// Initialize spotifyApi
const spotifyApi = new SpotifyWebApi({
  
  redirectUri: "http://localhost:3000/sections/inbox",
});

const ZenZone = () => {
   const lofiData = [
     { name: "Calming", spotifyId: "2FlhpsSAjE6GwxkJRK1tNc" },
     { name: "Stress Reliever", spotifyId: "3ZWqIiPp9JpcR7hOjF6TGD" },
     { name: "Deep Focus", spotifyId: "1nKETQ6WH0MAxikqQb1nmm" },
     //  https://open.spotify.com/track/1nKETQ6WH0MAxikqQb1nmm?si=00eb90ff4e0b4c97
     { name: "Chill Beats", spotifyId: "46zeJr0g4vNZUPYXJririB" },
     //  https://open.spotify.com/track/46zeJr0g4vNZUPYXJririB?si=6e0649e92bbc4e0b
     { name: "Relaxing Vibes", spotifyId: "1mJ9oAPuo3hHspOYamtoYc" },
     //  https://open.spotify.com/track/1mJ9oAPuo3hHspOYamtoYc?si=328906e558194656
     { name: "Study Music", spotifyId: "7eKgcdYbbjQWjphO6IlZ7k" },
     //  https://open.spotify.com/track/7eKgcdYbbjQWjphO6IlZ7k?si=353ccf06846a4bb3
     { name: "Productivity Boost", spotifyId: "7r2lA4klqJkEBsZ18JrfWD" },
     //  https://open.spotify.com/track/7r2lA4klqJkEBsZ18JrfWD?si=46060dd9b6994f72
     { name: "Creative Boost", spotifyId: "9QdEppYkJK3cRFy3LG7ieB" },
     { name: "Ambient Chill", spotifyId: "10dXppYkJK3cRFy3LG7ieC" },
     { name: "Tranquil Beats", spotifyId: "11ZdppYkJK3cRFy3LG7ieD" },
   ];

   const meditationData = [
     { name: "Peaceful", spotifyId: "3ABuGDnpGdi5GR13BiqSHq" },
     //  https://open.spotify.com/track/3ABuGDnpGdi5GR13BiqSHq?si=fb450d9a2a26419b
     { name: "Mindfulness", files: ["file7.mp3", "file8.mp3"] },
     { name: "Zen", files: ["file9.mp3", "file10.mp3"] },
     { name: "Inner Calm", files: ["file11.mp3", "file12.mp3"] },
     { name: "Relaxation", files: ["file13.mp3", "file14.mp3"] },
     { name: "Stress Relief", files: ["file15.mp3", "file16.mp3"] },
     { name: "Focus", files: ["file17.mp3", "file18.mp3"] },
     { name: "Balance", files: ["file19.mp3", "file20.mp3"] },
     { name: "Spiritual", files: ["file21.mp3", "file22.mp3"] },
     { name: "Harmony", files: ["file23.mp3", "file24.mp3"] },
   ];

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const getAccessToken = async () => {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              spotifyApi.getClientId() + ":" + spotifyApi.getClientSecret()
            ).toString("base64"),
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      });
      const data = await response.json();
      spotifyApi.setAccessToken(data.access_token);
    };
    getAccessToken();
  }, []);

  const handleClick = (card) => {
    if (card.spotifyId) {
      // For LoFi cards, get track from Spotify
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

  // ...

  return (
    <div className={styles.zenContainer}>
      <Sidebar />
      <div className={styles.container}>
        <h1 className={styles.header}>Zen Zone</h1>
        <h2 className={styles.header}>LoFi</h2>
        <select
          className={styles.card}
          onChange={(e) => handleClick(lofiData[e.target.value])}
        >
          <option>Select a LoFi option...</option>
          {lofiData.map((card, index) => (
            <option key={card.name} value={index}>
              {card.name}
            </option>
          ))}
        </select>
        <h2 className={styles.header}>Meditation</h2>
        <select
          className={styles.card}
          onChange={(e) => handleClick(meditationData[e.target.value])}
        >
          <option>Select a Meditation option...</option>
          {meditationData.map((card, index) => (
            <option key={card.name} value={index}>
              {card.name}
            </option>
          ))}
        </select>
        {currentTrack && (
          <div className={styles.playerContainer}>
            <iframe
              src={`https://open.spotify.com/embed/track/${currentTrack.id}`}
              width="300"
              height="380"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          </div>
        )}
      </div>
    </div>
  );
};


export default ZenZone;
