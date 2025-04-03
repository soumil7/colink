import React, { useState, useEffect } from "react";
import axios from "axios";
import soumil from '../components/soumil.jpeg'
import rajini from '../components/rajini.jpg';
import samantha from '../components/mantha.jpg';

import './LeaderBoard.css';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default data in case API fails or returns empty data
  const defaultData = [
    {
      username: "Soumil",
      profileImage: soumil,
      points: 1000,
    },
    {
      username: "Rajini",
      profileImage: rajini,
      points: 300,
    },
    {
      username: "Samantha",
      profileImage: samantha,
      points: 150,
    },
  ];

  useEffect(() => {
    // Fetch leaderboard data from the backend API
    axios
      .get("http://localhost:5000/api/leaderboard") // Replace with your actual API endpoint
      .then((response) => {
        // If data is empty or not available, use default data
        if (response.data && response.data.length > 0) {
          const sortedData = response.data.sort((a, b) => b.points - a.points);
          setLeaderboardData(sortedData);
        } else {
          setLeaderboardData(defaultData);
        }
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data", error);
        setLeaderboardData(defaultData); // Use default data if API fails
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {loading ? (
        <div>Loading...</div> // Show loading message while fetching
      ) : (
        <ul>
          {leaderboardData.map((user, index) => (
            <li key={index} className="leaderboard-item">
              <div className="profile-info">
                <img
                  className="profile-image"
                  src={user.profileImage}
                  alt={`${user.username}'s profile`}
                />
                <div className="profile-details">
                  <div className="username">{user.username}</div>
                  <div className="points">Points: {user.points}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;
