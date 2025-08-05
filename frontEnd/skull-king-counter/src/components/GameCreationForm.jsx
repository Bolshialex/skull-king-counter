import { useState, useEffect } from "react";
import playersFunctions from "../api/playersFunctions";

function GameCreationForm() {
  const [players, setPlayers] = useState([]);
  const [formFields, setFormFields] = useState([{ playerId: "" }]);
  const [numRounds, setNumRounds] = useState(1);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const data = await playersFunctions.getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error("Failed to load players:", error);
      }
    }

    fetchPlayers();
  }, []);

  const handleFormChange = (e, index) => {
    const data = [...formFields];
    data[index].playerId = e.target.value;
    setFormFields(data);
  };

  const handleAddPlayer = () => {
    setFormFields([...formFields, { playerId: "" }]);
  };

  const handleRoundChange = (e) => {
    setNumRounds(Number(e.target.value));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const playersArray = [];
    formFields.map((player) => {
      playersArray.push(Number(player.playerId));
    });

    try {
      const res = await playersFunctions.createGame({
        numRounds,
        playersArray,
      });
      console.log(res);
    } catch (error) {
      console.error("Failed to create game:", error);
    }
  };

  return (
    <form className="game-form" onSubmit={handleFormSubmit}>
      <div className="form-sub-container">
        <label htmlFor="rounds" className="form-label">
          Number of Rounds
        </label>
        <select
          name="rounds"
          id="rounds"
          className="form-input"
          value={numRounds}
          onChange={handleRoundChange}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {formFields.map((form, index) => (
        <div className="form-sub-container" key={index}>
          <label className="form-label" htmlFor={`playerId-${index}`}>
            Player {index + 1}
          </label>
          <select
            className="form-input"
            name={`playerId-${index}`}
            id={`playerId-${index}`}
            value={form.playerId}
            onChange={(e) => handleFormChange(e, index)}
          >
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.first_name + " " + player.last_name}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="form-btn-container">
        <button className="add-btn" type="button" onClick={handleAddPlayer}>
          +
        </button>
      </div>
      <div className="form-btn-container-submit">
        <button className="form-btn">Submit</button>
      </div>
    </form>
  );
}

export default GameCreationForm;
