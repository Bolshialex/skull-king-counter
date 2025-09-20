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

async function getPlayer(id) {
  try {
    const res = await axios.get(`${API_URL}/players/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching Player:", error);
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

async function createGame(gameInfo) {
  const { playersArray, numRounds } = gameInfo;
  try {
    const res = await axios.post(
      `${API_URL}/game`,
      { players: playersArray, rounds_needed: numRounds, roundNumber: 1 },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}

async function createPlayer(playerInfo) {
  const { first_name, last_name } = playerInfo;
  try {
    const res = await axios.post(
      `${API_URL}/players`,
      {
        first_name,
        last_name,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
}

async function getPlayerRoundInfo(player_id, round_id) {
  try {
    const playerInfo = await axios.get(`${API_URL}/players/${player_id}`);
    const playerRoundInfo = await axios.get(
      `${API_URL}/player-round/${player_id}/${round_id}`
    );

    return [playerInfo.data, playerRoundInfo.data];
  } catch (error) {
    console.error("Error getting player-round info:", error);
    throw error;
  }
}

export default {
  getPlayers,
  getStats,
  createGame,
  createPlayer,
  getPlayer,
  getPlayerRoundInfo,
};
