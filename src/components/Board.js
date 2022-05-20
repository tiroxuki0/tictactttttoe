import React from "react";
import Square from "./Square";

function Board(props) {
  const styles = {
    gridTemplateColumns: `repeat(${Math.sqrt(props.squares.length)}, 50px)`,
    gridTemplateRows: `repeat(${Math.sqrt(props.squares.length)}, 50px)`,
  };
  return (
    <div className="board" style={styles}>
      {props.squares.map((square, index) => {
        return (
          <Square
            key={index}
            value={square}
            step={props.step}
            onHistory={props.onHistory}
            isWinner={props.isWinner}
            onClick={() => props.onClick(index)}
            position={index}
            length={props.squares.length}
          />
        );
      })}
    </div>
  );
}

export default Board;
