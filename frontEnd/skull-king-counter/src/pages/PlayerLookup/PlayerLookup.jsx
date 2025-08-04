import React, { useEffect, useState } from "react";
import playersFunctions from "../../api/playersFunctions";

function PlayerLookup() {
  const [players, setPlayers] = useState([]);
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

  return (
    <>
      <div className="container">
        <div>
          <h1 className="title">All Players</h1>
        </div>
        <div className="container__players">
          <div className="container__search">
            <label htmlFor="">Search Players: </label>
            <input type="text" />
          </div>
          <div className="container__results">
            {players.map((player) => (
              <button className="players__info" key={player.id}>
                <p>
                  Player: <br /> {player.first_name} {player.last_name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerLookup;
