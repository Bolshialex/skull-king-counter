import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {});

  const handleClick = (route) => {
    navigate(`/${route}`);
  };
  return (
    <>
      <div className="container">
        <div>
          <h1 className="title">Skull-King Counter</h1>
          <p className="title__info">Choose an option</p>
        </div>

        <div className="container__btn">
          <button onClick={() => handleClick("game")}>Start New Game</button>
          <button>Continue Game</button>
          <button onClick={() => handleClick("player/create")}>
            Create New Player
          </button>
          <button onClick={() => handleClick("players")}>Lookup Player</button>
        </div>
      </div>
    </>
  );
}

export default Home;
