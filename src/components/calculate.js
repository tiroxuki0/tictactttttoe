const calculate = (board) => {
  /* new logic */
  var a = [...board];
  const rows = Math.sqrt(a.length);
  let table = [];
  while (a.length) {
    table.push(a.splice(0, rows));
  }

  const length = table.length - 1;
  if (Math.sqrt(board.length) < 9) {
    /* check diagonal right to left */
    for (let i = 0; i < table.length; i++) {
      for (let h = 0; h < table.length; h++) {
        if (
          table[i + 1] &&
          table[i + 2] &&
          table[i][length - h] !== null &&
          table[i + 1][length - h - 1] !== null &&
          table[i + 2][length - h - 2] !== null &&
          table[i][length - h] === table[i + 1][length - h - 1] &&
          table[i][length - h] === table[i + 2][length - h - 2]
        ) {
          return [
            i * Math.sqrt(board.length) + length - h,
            (i + 1) * Math.sqrt(board.length) + length - h - 1,
            (i + 2) * Math.sqrt(board.length) + length - h - 2,
          ];
        }
      }
    }

    for (let i = 0; i < table.length; i++) {
      for (let h = 0; h < table.length; h++) {
        if (
          table[i][h] &&
          table[i + 1] &&
          table[i + 2] &&
          table[i + 1][h + 1] &&
          table[i + 2][h + 2] &&
          table[i][h] === table[i + 1][h + 1] &&
          table[i][h] === table[i + 2][h + 2]
        ) {
          return [
            i * Math.sqrt(board.length) + h,
            (i + 1) * Math.sqrt(board.length) + h + 1,
            (i + 2) * Math.sqrt(board.length) + h + 2,
          ];
        }
      }
    }
    /* logic check */
    /*table j j j j j j */
    /* i 0 |0 1 2 3 4 5 */
    /* i 1 |0 1 2 3 4 5 */
    /* i 2 |0 1 2 3 4 5 */
    /* i 3 |0 1 2 3 4 5 */
    /* i 4 |0 1 2 3 4 5 */
    /* i 5 |0 1 2 3 4 5 */
    /* check vertical and horizon */
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table.length; j++) {
        if (
          table[i][j + 1] &&
          table[i][j + 2] &&
          table[i][j] === table[i][j + 1] &&
          table[i][j] === table[i][j + 2]
        ) {
          /* check horizon */
          return [
            i * Math.sqrt(board.length) + j,
            i * Math.sqrt(board.length) + j + 1,
            i * Math.sqrt(board.length) + j + 2,
          ];
        } else if (
          table[j + 1] &&
          table[j + 2] &&
          table[j][i] !== null &&
          table[j][i] === table[j + 1][i] &&
          table[j][i] === table[j + 2][i]
        ) {
          /* check vertical */
          return [
            j * Math.sqrt(board.length) + i,
            (j + 1) * Math.sqrt(board.length) + i,
            (j + 2) * Math.sqrt(board.length) + i,
          ];
        }
      }
    }
  } else {
    for (let i = 0; i < table.length; i++) {
      for (let h = 0; h < table.length; h++) {
        if (
          table[i + 1] &&
          table[i + 2] &&
          table[i + 3] &&
          table[i][length - h] &&
          table[i + 1][length - h - 1] !== null &&
          table[i + 2][length - h - 2] !== null &&
          table[i + 3][length - h - 3] !== null &&
          table[i][length - h] === table[i + 1][length - h - 1] &&
          table[i][length - h] === table[i + 2][length - h - 2] &&
          table[i][length - h] === table[i + 3][length - h - 3]
        ) {
          return [
            i * Math.sqrt(board.length) + length - h,
            (i + 1) * Math.sqrt(board.length) + length - h - 1,
            (i + 2) * Math.sqrt(board.length) + length - h - 2,
            (i + 3) * Math.sqrt(board.length) + length - h - 3,
          ];
        }
      }
    }

    for (let i = 0; i < table.length; i++) {
      for (let h = 0; h < table.length; h++) {
        if (
          table[i][h] &&
          table[i + 1] &&
          table[i + 2] &&
          table[i + 3] &&
          table[i + 1][h + 1] &&
          table[i + 2][h + 2] &&
          table[i + 3][h + 3] &&
          table[i][h] === table[i + 1][h + 1] &&
          table[i][h] === table[i + 2][h + 2] &&
          table[i][h] === table[i + 3][h + 3]
        ) {
          return [
            i * Math.sqrt(board.length) + h,
            (i + 1) * Math.sqrt(board.length) + h + 1,
            (i + 2) * Math.sqrt(board.length) + h + 2,
            (i + 3) * Math.sqrt(board.length) + h + 3,
          ];
        }
      }
    }
    /* check vertical and horizon */
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table.length; j++) {
        if (
          table[i][j + 1] &&
          table[i][j + 2] &&
          table[i][j + 3] &&
          table[i][j] === table[i][j + 1] &&
          table[i][j] === table[i][j + 2] &&
          table[i][j] === table[i][j + 3]
        ) {
          /* check horizon */
          return [
            i * Math.sqrt(board.length) + j,
            i * Math.sqrt(board.length) + j + 1,
            i * Math.sqrt(board.length) + j + 2,
            i * Math.sqrt(board.length) + j + 3,
          ];
        } else if (
          table[j + 1] &&
          table[j + 2] &&
          table[j + 3] &&
          table[j][i] &&
          table[j + 1][i] &&
          table[j + 2][i] &&
          table[j + 3][i] &&
          table[j][i] === table[j + 1][i] &&
          table[j][i] === table[j + 2][i] &&
          table[j][i] === table[j + 3][i]
        ) {
          /* check vertical */
          return [
            j * Math.sqrt(board.length) + i,
            (j + 1) * Math.sqrt(board.length) + i,
            (j + 2) * Math.sqrt(board.length) + i,
            (j + 3) * Math.sqrt(board.length) + i,
          ];
        }
      }
    }
  }
};

export default calculate;
