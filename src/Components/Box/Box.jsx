import React, { useState, useEffect } from "react";
import "./Box.css";

function Box({ content, revealed, onClick, gameStarted, onLoadingComplete }) {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clicked) {
      setLoading(true);
      const timer = setTimeout(() => {
        setClicked(false);
        setLoading(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [clicked, onLoadingComplete]);

  const playClickSound = () => {
    const audio = new Audio("/Audio/mixkit-arcade-game-jump-coin-216.wav"); // Corrected path
    audio.play();
  };

  const handleClick = (event) => {
    if (!gameStarted) return;
    setClicked(true);
    onClick(event);
    playClickSound();
  };

  const boxClass = gameStarted
    ? `box flex items-center justify-center w-[50px] h-[30px] lg:w-[160px] lg:h-[50px] bg-[#F7AB98] rounded-lg text-normal lg:text-2xl cursor-pointer text-black gap-1 lg:gap-2 ${
        clicked ? "transition-transform duration-10 transform scale-110" : ""
      } ${revealed ? "bg-neon-green animate-neon" : "latest"}`
    : `box flex items-center justify-center w-[50px] h-[30px] lg:w-[160px] lg:h-[50px] bg-[#444444] rounded-lg text-normal lg:text-2xl cursor-pointer text-black gap-1 lg:gap-2 ${
        clicked ? "transition-transform duration-10 transform scale-110" : ""
      }`;

  return (
    <div className={boxClass} onClick={handleClick}>
      {loading ? (
        <div className="loader">
          <div className="loader-inner animate-spin rounded-full h-5 w-5 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1s_linear_infinite]"></div>
        </div>
      ) : revealed ? (
        content === "diamond" ? (
          <div className="w-[40px] h-[25px]">
            <svg width="100%" height="100%" viewBox="0 0 44 33">
              <defs>
                <mask id="diamond-shape">
                  <polygon
                    points="11 -2.28983499e-16 33 9.15933995e-16 44 11 22.0054559 33 2.27359798e-13 11"
                    fill="white"
                  ></polygon>
                </mask>
              </defs>
              <polygon
                points="11 -2.28983499e-16 33 9.15933995e-16 44 11 22.0054559 33 2.27359798e-13 11"
                fill="#78fda8"
              ></polygon>
            </svg>
          </div>
        ) : content === "mine" ? (
          "💣"
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default Box;
