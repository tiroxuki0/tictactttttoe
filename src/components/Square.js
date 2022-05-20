function Square(props) {
  const clickAble =
    props.value ||
    props.step.length === props.length ||
    props.onHistory ||
    props.isWinner
      ? "none"
      : "auto";
  const classN = props.value === "X" ? "isX" : props.value === "O" ? "isO" : "";
  /* const borderTopStyle =
    props.position <= Math.sqrt(props.length) - 1 ? "none" : "";
  const borderRightStyle =
    (props.position + 1) % Math.sqrt(props.length) === 0 ? "none" : "";
  const borderLeftStyle =
    props.position % Math.sqrt(props.length) === 0 || props.position === 0
      ? "none"
      : "";
  const borderBottomStyle =
    props.position >= Math.sqrt(props.length) * (Math.sqrt(props.length) - 1) &&
    props.position <= props.length
      ? "none"
      : ""; */
  return (
    <div className="square dark">
      <button
        className={classN}
        onClick={props.onClick}
        /* style={{
          pointerEvents: clickAble,
        }} */
      >
        {props.value}
      </button>
    </div>
  );
}

export default Square;
