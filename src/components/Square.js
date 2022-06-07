function Square(props) {
  const clickAble =
    props.value ||
    props.step.length === props.length ||
    props.onHistory ||
    props.isWinner
      ? "none"
      : "auto";
  const classN = props.value === "X" ? "isX" : props.value === "O" ? "isO" : "";
  const newStyles = props.winnerStyles + " square";
  return (
    <div className={newStyles}>
      <button
        className={classN}
        onClick={props.onClick}
        style={{
          pointerEvents: clickAble,
        }}
      >
        {props.value}
      </button>
    </div>
  );
}

export default Square;
