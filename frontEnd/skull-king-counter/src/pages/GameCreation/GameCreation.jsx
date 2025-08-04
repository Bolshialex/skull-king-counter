import GameCreationForm from "../../components/GameCreationForm";

function GameCreation() {
  return (
    <div className="container">
      <div>
        <h1 className="title">Start New Game</h1>
      </div>
      <div>
        <h2>Game Info</h2>
        <GameCreationForm />
      </div>
    </div>
  );
}

export default GameCreation;
