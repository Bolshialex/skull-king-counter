import { useLocation } from "react-router-dom";
import RoundCreationForm from "../components/RoundCreationForm";

function RoundPage() {
  const location = useLocation();
  const { round_info, game_info } = location.state;

  // console.log(round_info);
  // console.log(game_info);
  return (
    <div className="container">
      <div>
        <h1 className="title">Skull-King Counter</h1>
        <p className="title__info">
          Round {round_info.round_number} of {game_info.rounds_needed}
        </p>
      </div>
      <RoundCreationForm RoundData={location.state} />
    </div>
  );
}

export default RoundPage;
