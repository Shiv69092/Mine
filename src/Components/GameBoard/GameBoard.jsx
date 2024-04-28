import React, { useState, useEffect } from "react";
import Box from "../Box/Box";

function GameBoard({ mines, gameStarted, setMines, resetGame }) {
  const [boxes, setBoxes] = useState(
    Array(25).fill({ content: "", revealed: false })
  );
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted]);

  const playClickSound = () => {
    const audio = new Audio(
      "/Audio/mixkit-quick-win-video-game-notification-269.wav"
    );
    audio.play();
  };

  const playLoseSound = () => {
    const audio = new Audio("/Audio/mixkit-video-game-retro-click-237.wav");
    audio.play();
  };

  const initializeGame = () => {
    const newBoxes = Array(25)
      .fill(null)
      .map((_, index) => ({
        id: index,
        content: null,
        revealed: false,
      }));

    const shuffledIndices = shuffle([...Array(25).keys()]);
    let mineCount = 0;

    for (let i = 0; i < mines; i++) {
      newBoxes[shuffledIndices[i]].content = "mine";
      mineCount++;
    }

    for (let i = mines; i < 25; i++) {
      newBoxes[shuffledIndices[i]].content = "diamond";
    }

    setBoxes(newBoxes);
    setGameOver(false);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleBoxLoadingComplete = (boxIndex) => {
    const updatedBoxes = [...boxes];
    const clickedBox = updatedBoxes[boxIndex];

    if (clickedBox.revealed) return;

    clickedBox.revealed = true;

    if (clickedBox.content === "mine") {
      setGameOver(true);
      setModalMessage("You lost! Try again.");
      setTimeout(() => {
        setShowModal(true);
        playLoseSound();
      }, 1200);
      resetGame();
      return;
    }

    if (clickedBox.content === "diamond") {
      const diamondsFound = updatedBoxes.filter(
        (box) => box.content === "diamond" && box.revealed
      ).length;
      if (diamondsFound === mines) {
        setGameOver(true);
        setModalMessage("Congratulations! You won!");
        setTimeout(() => {
          setShowModal(true);
          playClickSound();
        }, 1200);
        resetGame();
      }
    }

    setBoxes(updatedBoxes);
  };

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div className="m-[10px] py-2 lg:py-4 gap-1 lg:gap-2 grid grid-cols-5 grid-rows-5 justify-center rounded w-full">
        {boxes.map((box, index) => (
          <Box
            key={index}
            content={box.content}
            gameStarted={gameStarted}
            revealed={box.revealed}
            onClick={() => handleBoxLoadingComplete(index)}
            onLoadingComplete={() => handleBoxLoadingComplete(index)}
            className="box"
          />
        ))}
        {showModal && (
          <>
            <div className="fixed inset-0 flex items-center justify-center z-50 opacity-80">
              <div className="text-[#FFD085] items-center bg-gray-800 rounded-lg flex flex-col gap-5 justify-center p-9">
                <p className="text-lg text-[#FFD085]">{modalMessage}</p>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setShowModal(false);
                    initializeGame();
                    setMines(1);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GameBoard;
