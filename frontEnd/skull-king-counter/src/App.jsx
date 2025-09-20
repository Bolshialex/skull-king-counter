import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameCreation from "./pages/GameCreation";
import PlayerLookup from "./pages/PlayerLookup";
import PlayerCreation from "./pages/PlayerCreation";
import RoundPage from "./pages//RoundPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameCreation />} />
          <Route path="/players" element={<PlayerLookup />} />
          <Route path="/player/create" element={<PlayerCreation />} />
          <Route path="/round/:id" element={<RoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
