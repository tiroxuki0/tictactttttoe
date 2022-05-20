const calculate = (board) => {
  /* new logic */
  var a = [...board];
  const rows = Math.sqrt(a.length);
  let table = [];
  while (a.length) {
    table.push(a.splice(0, rows));
  }

  /* logic check */
  /*table j j j j j j */
  /* i 0 |0 1 2 3 4 5 */
  /* i 1 |0 1 2 3 4 5 */
  /* i 2 |0 1 2 3 4 5 */
  /* i 3 |0 1 2 3 4 5 */
  /* i 4 |0 1 2 3 4 5 */
  /* i 5 |0 1 2 3 4 5 */
  for (let i = 1; i < table.length; i++) {
    const rows = table[i];
    for (let h = 0; h < table.length; h++) {
      for (let k = i; k < rows.length; k++) {
        console.log("-----------------");
        console.log(h, k);
        console.log(h + 1, k + 1);
        console.log(h + 2, k + 2);
        if (table[h + 1] && table[h + 2]) {
          if (
            table[h][k] !== null &&
            table[h + 1][k + 1] !== null &&
            table[h + 2][k + 2] !== null &&
            table[h][k] === table[h + 1][k + 1] &&
            table[h][k] === table[h + 2][k + 2]
          ) {
            return table[h][k];
          }
        }
      }
    }
  }
  /* check vertical and horizon */
  for (let i = 0; i < table.length; i++) {
    const rows = table[i];
    /* count mark */
    for (let j = 0; j < rows.length; j++) {
      if (
        rows[j] !== null &&
        rows[j] === rows[j + 1] &&
        rows[j] === rows[j + 2]
      ) {
        /* check horizon */
        return rows[j];
      } else if (
        table[j + 1] &&
        table[j + 2] &&
        table[j][i] !== null &&
        table[j][i] === table[j + 1][i] &&
        table[j][i] === table[j + 2][i]
      ) {
        /* check vertical */
        return table[j][i];
      }
    }
  }
  /* check diagonal from middle line top left to bottom right */
  /* for (let i = 0; i < table.length; i++) {
    if (
      table[i + 1] &&
      table[i + 2] &&
      table[i + 1][i + 1] !== null &&
      table[i + 2][i + 2] !== null &&
      table[i][i] === table[i + 1][i + 1] &&
      table[i][i] === table[i + 2][i + 2]
    ) {
      return table[i][i];
    }
  } */
};

export default calculate;
