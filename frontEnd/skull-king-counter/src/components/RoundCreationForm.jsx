import { useEffect, useState } from "react";
import gameFunctions from "../api/gameFunctions";

function RoundCreationForm(props) {
  const { game_info, round_info } = props.RoundData;
  const [players, setPlayers] = useState([]);
  const [formFields, setFormFields] = useState([]);

  console.log({ game: game_info, round: round_info });
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const playerInfos = await Promise.all(
          game_info.players.map((playerId) =>
            gameFunctions.getPlayerRoundInfo(playerId, round_info.id)
          )
        );

        setPlayers(playerInfos);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }

    fetchPlayers();

    if (game_info?.players?.length > 0) {
      const initialFields = game_info.players.reduce(
        (acc, playerId) => {
          acc[playerId] = {
            bid: 0,
            tricks_won: 0,
            bonus_points: 0,
            round_score: 0,
            player_id: playerId,
          };
          return acc;
        },
        { round_id: round_info.id }
      );

      setFormFields(initialFields);
    }
  }, []);

  const handleChange = (id, field, value) => {
    setFormFields((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: Number(value),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting formFields:", formFields);
    // 👉 send formFields to API here
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-divider">
        <table className="score-table">
          <thead>
            {console.log(formFields)}
            <tr>
              <th>🏴‍☠️ Player</th>
              <th>💰 Score</th>
              <th>⚓ Bids Needed</th>
              <th>🦜 Bids Won</th>
              <th>🍹 Bonus Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const id = player[0].player.id;
              return (
                <tr key={id}>
                  <td className="player-name">
                    {player[0].player.first_name} {player[0].player.last_name}
                  </td>

                  {round_info.round_number === 1 ? (
                    <td className="score">0</td>
                  ) : (
                    <td className="score">{player[1].score}</td>
                  )}

                  {/* Bid */}
                  <td className="bids-needed">
                    <select
                      className="select-input"
                      value={formFields[id]?.bid || ""}
                      onChange={(e) => handleChange(id, "bid", e.target.value)}
                    >
                      {[...Array(round_info.round_number + 1)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Tricks Won */}
                  <td>
                    <select
                      className="select-input"
                      value={formFields[id]?.tricks_won || ""}
                      onChange={(e) =>
                        handleChange(id, "tricks_won", e.target.value)
                      }
                    >
                      {[...Array(round_info.round_number + 1)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Bonus Points */}
                  <td>
                    <input
                      className="number-input"
                      type="number"
                      value={formFields[id]?.bonus_points || ""}
                      onChange={(e) =>
                        handleChange(id, "bonus_points", e.target.value)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="form-btn-container-submit">
          <button type="submit" className="form-btn">
            Next Round
          </button>
        </div>
      </div>
    </form>
  );
}

export default RoundCreationForm;
