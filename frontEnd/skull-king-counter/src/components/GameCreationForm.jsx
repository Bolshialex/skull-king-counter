import { useState, useEffect } from "react";
import gameFunctions from "../api/gameFunctions";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function GameCreationForm() {
  const [players, setPlayers] = useState([]);
  const [formFields, setFormFields] = useState([{ playerId: "" }]);
  const [numRounds, setNumRounds] = useState(1);
  const [playerCount, setPlayerCount] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const data = await gameFunctions.getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error("Failed to load players:", error);
      }
    }

    fetchPlayers();
  }, [formFields]);

  const handleFormChange = (e, index) => {
    const data = [...formFields];
    data[index].playerId = e.target.value;
    setFormFields(data);
  };

  const handleAddPlayer = () => {
    setPlayerCount(playerCount + 1);
    setFormFields([...formFields, { playerId: "" }]);
  };

  const handleRoundChange = (e) => {
    setNumRounds(Number(e.target.value));
  };

  const handleDeleteBtn = () => {
    setPlayerCount(playerCount - 1);
    formFields.pop();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const playersArray = [];
    formFields.map((player) => {
      playersArray.push(Number(player.playerId));
    });

    try {
      const res = await gameFunctions.createGame({
        numRounds,
        playersArray,
      });

      console.log(res);

      if (res.message == "Game Created") {
        navigate(`/round/${res.round_info.id}`, { state: res });
      }
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
          <div className="form-select-container">
            <select
              className="form-input"
              name={`playerId-${index}`}
              id={`playerId-${index}`}
              value={form.playerId}
              onChange={(e) => handleFormChange(e, index)}
            >
              <option>Select Player</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.first_name + " " + player.last_name}
                </option>
              ))}
            </select>
            {index > 1 ? (
              <FaRegTrashCan className="trash-icon" onClick={handleDeleteBtn} />
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
      <div className="form-btn-container">
        {playerCount > 8 ? (
          <></>
        ) : (
          <button className="add-btn" type="button" onClick={handleAddPlayer}>
            +
          </button>
        )}
      </div>
      <div className="form-btn-container-submit">
        <button className="form-btn">Submit</button>
      </div>
    </form>
  );
}

export default GameCreationForm;
