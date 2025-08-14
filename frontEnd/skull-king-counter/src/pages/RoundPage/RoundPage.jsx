import { useLocation } from "react-router-dom";

function RoundPage() {
  const location = useLocation();
  const { round_info, game_info } = location.state;

  console.log(round_info, game_info);
  return (
    <div className="container">
      <div> Round</div>
    </div>
  );
}

export default RoundPage;
