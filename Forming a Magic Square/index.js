// Forming a Magic Square

function makeStrFromMatrix(matrix) {
  let str = '';
  for(let i = 0; i < 3; i++) {
    str += matrix[i][0];
    str += matrix[i][1];
    str += matrix[i][2];
  };
  return str;
}

function formingMagicSquare(matrix) {
  const magicSquares = [
    '816357492',
    '618753294',
    '492357816',
    '294753618',
    '834159672',
    '438951276',
    '672159834',
    '276951438',
  ];
  const matrixStr = makeStrFromMatrix(matrix);
  let minCost = 1000000;
  magicSquares.forEach((square) => {
    let tempMinCost = 0;
    for(let i = 0; i < 9; i++) {
      tempMinCost += Math.abs(Number(matrixStr[i]) - Number(square[i]));
    }
    minCost = tempMinCost < minCost ? tempMinCost : minCost;

  });
  return minCost;
}

console.log(formingMagicSquare([ [ 4, 9, 2 ], [ 3, 5, 7 ], [ 8, 1, 5 ] ]));