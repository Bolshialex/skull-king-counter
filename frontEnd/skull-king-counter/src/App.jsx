import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import GameCreation from "./pages/GameCreation/GameCreation";
import PlayerLookup from "./pages/PlayerLookup/PlayerLookup";
import PlayerCreation from "./pages/PlayerCreation/PlayerCreation";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameCreation />} />
          <Route path="/players" element={<PlayerLookup />} />
          <Route path="/player/create" element={<PlayerCreation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
