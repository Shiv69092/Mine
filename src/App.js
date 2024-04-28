import React, { useState } from "react";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import img from "../src/Assets/download.png";
import "./Components/Box/Box.css";
import "./App.css";

function App() {
  const [mines, setMines] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const handlePlay = () => {
    if (mines <= 0) {
      alert("Please enter a valid number of mines.");
      return;
    }
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="bg-[#070707]">
      <div>
        <div className="flex justify-left items-center bg-[#292929] w-full mt-0 p-3 sticky">
          <img className="w-[10%] md:w-[5%] h-full pr-3" src={img} alt="" />
          <h1 className="text-white">Casino Solano</h1>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="flex flex-col items-center h-screen gap-2 bg-[#202020] w-[90%] lg:w-[70%] rounded-xl overflow-hidden">
          <div className="">
            <GameBoard
              mines={mines}
              setMines={setMines}
              gameStarted={gameStarted}
              resetGame={resetGame}
            />
          </div>
          <div className="w-full flex flex-col items-center py-4">
            <div className="input-container w-[75%] mb-5">
              <span className="text-white">{mines} Mines</span>
              <input
                type="range"
                value={mines}
                onChange={(e) => setMines(parseInt(e.target.value))}
                disabled={gameStarted}
                min="1"
                max="24"
                step="1"
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
              />
            </div>
            <button
              className={`bg-[#292929] text-black font-bold py-2 px-4 rounded w-[80%] ${
                gameStarted ? "" : "latest"
              }`}
              onClick={handlePlay}
              disabled={gameStarted}
            >
              {gameStarted ? "PICK A TILE" : "PLAY"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
