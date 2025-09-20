import PlayerCreationForm from "../components/PlayerCreationForm";

function PlayerCreation() {
  return (
    <div className="container">
      <div>
        <h1 className="title">Player Creation</h1>
        <p className="title__info">Insert Player Info</p>
      </div>
      <div className="form-container">
        <PlayerCreationForm />
      </div>
    </div>
  );
}

export default PlayerCreation;
