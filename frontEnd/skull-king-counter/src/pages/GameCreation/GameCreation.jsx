import GameCreationForm from "../../components/GameCreationForm";

function GameCreation() {
  return (
    <div className="container">
      <div>
        <h1 className="title">Start New Game</h1>
      </div>
      <div className="form-container">
        <p className="title__info">Game Settings</p>
        <GameCreationForm />
      </div>
    </div>
  );
}

export default GameCreation;
