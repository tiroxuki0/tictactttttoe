import React from "react";
import Square from "./Square";

function Board(props) {
  const styles = {
    gridTemplateColumns: `repeat(${Math.sqrt(props.squares.length)}, auto)`,
    gridTemplateRows: `repeat(${Math.sqrt(props.squares.length)}, auto)`,
  };
  return (
    <div className="board" style={styles}>
      {props.squares.map((square, index) => {
        let winnerStyles = "";
        if (props.isWinner && props.isWinner.includes(index)) {
          console.log(props.isWinner);
          winnerStyles = "yes";
        }
        return (
          <Square
            winnerStyles={winnerStyles}
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
