import React from "react";

function RoundCreationForm(props) {
  const { game_info, round_info } = props.RoundData;
  console.log(game_info.players.map((player) => player));
  return (
    <form className="form-container">
      <div className="form-divider">
        <table className="score-table">
          <thead>
            <tr>
              <th>🏴‍☠️ Player</th>
              <th>💰 Score</th>
              <th>⚓ Bids Needed</th>
              <th>🦜 Bids Won</th>
              <th>🍹 Bonus Points</th>
              <th>🗺️ New Bid</th>
            </tr>
          </thead>
          <tbody>
            {game_info.players.map((player) => (
              <tr>
                <td className="player-name">Captain Jack</td>
                <td className="score">25</td>
                <td className="bids-needed">5</td>
                <td>
                  <select className="select-input">
                    {[...Array(11)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input className="number-input" type="number" />
                </td>
                <td>
                  <select className="select-input">
                    {[...Array(11)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}

export default RoundCreationForm;
