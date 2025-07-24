import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameCreation from "./pages/GameCreation";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameCreation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
