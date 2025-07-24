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
        <h1>Welcome to skull-king counter</h1>
        <p>Please choose an option</p>
        <div className="btn-container">
          <button onClick={() => handleClick("game")}>Start New Game</button>
          <button>Continue Game</button>
          <button>Create Player</button>
          <button>Lookup Player</button>
        </div>
      </div>
    </>
  );
}

export default Home;
