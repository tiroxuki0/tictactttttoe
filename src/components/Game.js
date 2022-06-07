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
        { value: 1, easing: "easeInOutQuad", duration: 250 },
      ],
      delay: anime.stagger(70, {
        grid: [boardSize, boardSize],
        from: e,
      }),
    });
  };
  React.useEffect(() => {
    setIsWinner(calculate(board));
  }, [xIsNext]);

  const cursorRef = React.useRef(null);
  React.useEffect(() => {
    document.onmousemove = (e) => {
      cursorRef.current.style.left = e.pageX + 5 + "px";
      cursorRef.current.style.top = e.pageY - 30 + "px";
    };
  }, []);
  /* handle restart */
  const handleRestart = () => {
    const size = boardSize * boardSize;
    setIsWinner("");
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
      delay: anime.stagger(100, { start: 1000 }),
      translateY: [-150, 0],
      translateX: [-10, 30],
    });
    animationBoard.current = anime({
      targets: ".board",
      scale: {
        value: [0, 1],
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
    setIsWinner("");
    setOnHistory(false);
    setBoardSize(e.target.value);
    setBoard(Array(e.target.value * e.target.value).fill(null));
    setStep([]);
    animationBoard.current = anime({
      targets: ".board",
      translateX: {
        value: [-1000, 0],
        duration: 800,
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

  /* bars button */
  const handleBars = (e) => {
    if (e.target.checked) {
      document.querySelector(".bars").classList.add("toggle");
      document.querySelector(".controls").classList.add("show");
    } else {
      document.querySelector(".controls").classList.remove("show");
      document.querySelector(".bars").classList.remove("toggle");
    }
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
        <div className="bars-control hidden-lg">
          <input
            type="checkbox"
            id="bars_input"
            onClick={handleBars}
            style={{ display: "none" }}
          />
          <label className="bars" htmlFor="bars_input">
            <div></div>
            <div></div>
            <div></div>
          </label>
        </div>
        <div className="controls">
          <div className="winnerBanner">
            <div className="isWinner">
              {/* <p>{isWinner ? "Winner: " : ""}</p>
              <h2 className={"is" + isWinner + "winner"}>
                {isWinner !== undefined ? isWinner : ""}
              </h2> */}
            </div>
          </div>
          <div className="controls-top">
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

          <ul className="step hidden-md">
            {step.map((e, i) => {
              return (
                <li key={i} onClick={() => rollBack(i)}>
                  <label className={"step" + e.name}>Step {i + 1} : </label>{" "}
                  {e.name} on position {e.i + 1}
                </li>
              );
            })}
          </ul>
          <div className="isNext" ref={cursorRef}>
            <button className={xIsNext ? "isXNext" : "isONext"}>
              {xIsNext ? "X" : "O"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
