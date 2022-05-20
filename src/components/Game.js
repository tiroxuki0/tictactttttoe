import anime from "animejs/lib/anime.es.js";
import React from "react";
import Board from "./Board";
import calculate from "./calculate";

function Game() {
  const [boardSize, setBoardSize] = React.useState(10);
  const [onHistory, setOnHistory] = React.useState(false);
  const [board, setBoard] = React.useState(Array(100).fill(null));
  const [step, setStep] = React.useState([]);
  const [xIsNext, setXisNext] = React.useState(true);
  const [isWinner, setIsWinner] = React.useState("");
  const handleClick = (e) => {
    const boardCopy = [...board];
    const target = xIsNext ? "X" : "O";
    boardCopy[e] = target;
    setBoard(boardCopy);
    setXisNext(!xIsNext);
    setStep((prev) => [...prev, { i: e, name: target }]);
    animationButton.current = anime({
      targets: ".board .square",
      scale: [
        { value: 0.9, easing: "easeOutSine", duration: 100 },
        { value: 1, easing: "easeInOutQuad", duration: 400 },
      ],
      delay: anime.stagger(70, {
        grid: [boardSize, boardSize],
        from: e,
      }),
    });

    /* animationButton.current = anime({
      targets: ".board .square",
      translateX: anime.stagger(10, {
        grid: [14, 5],
        from: "center",
        axis: "x",
      }),
      translateY: anime.stagger(10, {
        grid: [14, 5],
        from: "center",
        axis: "y",
      }),
      rotateZ: anime.stagger([0, 90], {
        grid: [14, 5],
        from: "center",
        axis: "x",
      }),
      delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
      easing: "easeInOutQuad",
    }); */
  };
  React.useEffect(() => {
    setIsWinner(calculate(board));
  });

  /* handle restart */
  const handleRestart = () => {
    const size = boardSize * boardSize;
    setOnHistory(false);
    setBoard(Array(size).fill(null));
    setStep([]);
    animationButton.current = anime({
      targets: ".board .square",
      translateX: anime.stagger(0, {
        grid: [boardSize, boardSize],
        from: "center",
        axis: "x",
      }),
      translateY: anime.stagger(0, {
        grid: [boardSize, boardSize],
        from: "center",
        axis: "y",
      }),
      rotateZ: anime.stagger([0, 0], {
        grid: [boardSize, boardSize],
        from: "center",
        axis: "x",
      }),
      delay: anime.stagger(200, {
        grid: [boardSize, boardSize],
        from: "center",
      }),
      easing: "easeInOutQuad",
    });
  };

  /* handle click on history */
  const rollBack = (i) => {
    const fakeStep = [...step];
    const result = fakeStep.filter((s, index) => {
      return index <= i;
    });
    const arrayNew = Array(boardSize * boardSize).fill(null);
    result.forEach((s) => {
      arrayNew[s.i] = s.name;
    });
    setBoard(arrayNew);
    if (i + 1 < step.length) {
      setOnHistory(true);
    } else {
      setOnHistory(false);
    }
  };

  /* animation */
  const animationTitle = React.useRef(null);
  const animationButton = React.useRef(null);
  const animationBoard = React.useRef(null);
  React.useLayoutEffect(() => {
    animationTitle.current = anime({
      targets: ".game-title .letter",
      opacity: 1,
      translateY: 50,
      rotate: {
        value: 360,
        duration: 2000,
        easing: "easeInExpo",
      },
      delay: anime.stagger(100, { start: 1000 }),
      translateY: [-150, 0],
      translateX: [-10, 30],
    });
    animationBoard.current = anime({
      targets: ".board",
      translateX: {
        value: [-1000, 0],
        duration: 800,
      },
      rotate: {
        value: 180,
        duration: 1000,
        easing: "easeInOutSine",
      },
      scale: {
        value: [0.5, 1],
        duration: 1600,
        delay: 800,
        easing: "easeInOutQuart",
      },
      delay: 250, // All properties except 'scale' inherit 250ms delay
    });
  }, []);

  /* handle change board size */
  const boardSizes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const handleBoardSize = (e) => {
    setBoardSize(e.target.value);
    setBoard(Array(e.target.value * e.target.value).fill(null));
    setStep([]);
    animationBoard.current = anime({
      targets: ".board",
      translateX: {
        value: [-1000, 0],
        duration: 800,
      },
      rotate: {
        value: 180,
        duration: 1000,
        easing: "easeInOutSine",
      },
      scale: {
        value: [0.5, 1],
        duration: 1600,
        delay: 800,
        easing: "easeInOutQuart",
      },
      delay: 250, // All properties except 'scale' inherit 250ms delay
    });
  };
  return (
    <div className="game">
      <h2 className="game-title">
        <span className="letter">T</span>
        <span className="letter">I</span>
        <span className="letter">C</span>
        <div>&nbsp;</div>
        <span className="letter">T</span>
        <span className="letter">A</span>
        <span className="letter">C</span>
        <div>&nbsp;</div>
        <span className="letter">T</span>
        <span className="letter">O</span>
        <span className="letter">E</span>
      </h2>
      <div className="main">
        <Board
          squares={board}
          onClick={handleClick}
          step={step}
          onHistory={onHistory}
          isWinner={isWinner}
        />
        <div className="controls">
          <div className="winnerBanner">
            <div className="isWinner">
              <p>{isWinner ? "Winner: " : ""}</p>
              <h2 className={"is" + isWinner + "winner"}>
                {isWinner !== undefined ? isWinner : ""}
              </h2>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <div className="board-size">
              <select onChange={handleBoardSize}>
                {boardSizes.map((size) => {
                  if (size == boardSize) {
                    return (
                      <option key={size} value={size} selected>
                        {size + " " + "x" + " " + size}
                      </option>
                    );
                  } else {
                    return (
                      <option key={size} value={size}>
                        {size + " " + "x" + " " + size}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <button className="restart" onClick={handleRestart}>
              Restart
            </button>
          </div>
          <h4 className="isNext">Next: {xIsNext ? "X" : "O"}</h4>
          <ul className="step">
            {step.map((e, i) => {
              return (
                <li key={i} onClick={() => rollBack(i)}>
                  <label className={"step" + e.name}>Step {i + 1} : </label>{" "}
                  {e.name} on position {e.i + 1}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Game;
