const grid = [ '.......', '...O...', '....O..', '.......', 'OO.....', 'OO.....' ];

function getGridDetonated(grid, numRow, numCol, maxIRow, maxICol, rowFullBomb) {
  const result = grid.map(() => rowFullBomb.split(''));
  for(let i = 0; i < numRow; i++) {
    for(let j = 0; j < numCol; j++) {
      if (grid[i][j] === 'O') {
        grid[i][j] = '.';
        result[i][j] = '.';
        if (i + 1 <= maxIRow && grid[i + 1][j] !== 'O') {
          grid[i + 1][j] = '.';
          result[i + 1][j] = '.';
        }
        if (i - 1 >= 0 && grid[i - 1][j] !== 'O') {
          grid[i - 1][j] = '.';
          result[i - 1][j] = '.';
        }
        if (j + 1 <= maxICol && grid[i][j + 1] !== 'O') {
          grid[i][j + 1] = '.';
          result[i][j + 1] = '.';
        }
        if (j - 1 >= 0 && grid[i][j - 1] !== 'O') {
          grid[i][j - 1] = '.';
          result[i][j - 1] = '.';
        }
      }
    }
  }
  return result;
}

function bomberMan(n, rawGrid) {
  if (n === 1) return rawGrid;

  const numRow = rawGrid.length;
  const numCol = rawGrid[0].length;
  const maxIRow = numRow - 1;
  const maxICol = numCol - 1;

  const rowFullBomb = 'O'.repeat(numCol);
  const gridFullBomb = rawGrid.map(() => rowFullBomb);
  if (n % 2 === 0) return gridFullBomb;

  const gridAt1s = rawGrid.map(row => row.split(''));
  const gridAt3s = getGridDetonated(gridAt1s, numRow, numCol, maxIRow, maxICol, rowFullBomb);
  if (Number.isInteger(((n - 3) / 4) + 1)) {
    return gridAt3s.map(row => row.join(''));
  }

  const gridAt5s = getGridDetonated(gridAt3s, numRow, numCol, maxIRow, maxICol, rowFullBomb);
  if (Number.isInteger(((n - 5) / 4) + 1)) {
    return gridAt5s.map(row => row.join(''));
  }
}

console.log(bomberMan(5, grid));