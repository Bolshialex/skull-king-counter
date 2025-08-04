import axios from "axios";
const API_URL = "http://localhost:3333";

async function getPlayers() {
  try {
    const res = await axios.get(`${API_URL}/players`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching Players:", error);
    throw error;
  }
}

async function getStats(playerId) {
  try {
    const res = await axios.get(`${API_URL}/players/${playerId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching Player Stats:", error);
    throw error;
  }
}

export default { getPlayers, getStats };
