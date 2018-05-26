'use strict';
var lineReader = require('line-reader');

function calcNumRotateMin(iRound, numRow, numCol, numRotate) {
  const numRowSubMatrix = numRow - iRound * 2;
  const numColSubMatrix = numCol - iRound * 2;
  if(numRowSubMatrix === 1 && numColSubMatrix === 1) return 0;
  const maxRotateReturn = (numRowSubMatrix - 2) * 2 + (numColSubMatrix - 2) * 2 + 4;
  return numRotate % maxRotateReturn;
}

function movePosition(iRow, iCol, iRound, numRow, numCol, numRotate, type) {
  if(numRotate <= 0) return {y: iRow, x: iCol, numRotate};
  const maxRowRound = numRow - iRound - 1;
  const maxColRound = numCol - iRound - 1;
  switch(type % 4) {
    case 0:
      let oldIRow = iRow;
      iRow = iRow + numRotate >= maxRowRound ? maxRowRound : iRow + numRotate;
      numRotate = numRotate - (Math.abs(iRow - oldIRow));
      return {y: iRow, x: iCol, numRotate};
    case 1:
      if(iRow === maxRowRound && iCol < maxColRound) {
        let oldICol = iCol;
        iCol = iCol + numRotate >= maxColRound ? maxColRound : iCol + numRotate;
        numRotate = numRotate - (Math.abs(iCol - oldICol));
      }
      return {y: iRow, x: iCol, numRotate};
    case 2:
      if(iCol === maxColRound && iRow > iRound) {
        let oldIRow = iRow;
        iRow = iRow - iRound <= numRotate ? iRound : iRow - numRotate;
        numRotate = numRotate - (Math.abs(iRow - oldIRow));
      }
      return {y: iRow, x: iCol, numRotate};
    case 3:
      let oldICol = iCol;
      iCol = iCol - iRound <= numRotate ? iRound : iCol - numRotate;
      numRotate = numRotate - (Math.abs(iCol - oldICol));
      return {y: iRow, x: iCol, numRotate};
  }
}

function calcNewPosition(iRow, iCol, iRound, numRow, numCol, numRotate) {
  const maxRowRound = numRow - iRound - 1;
  const maxColRound = numCol - iRound - 1;
  let pointType = 0;
  let newPosition;
  if(iRow === maxRowRound && iCol < maxColRound) pointType = 1;
  else if(iCol === maxColRound && iRow > iRound) pointType = 2;
  else if(iRow === iRound && iCol > iRound) pointType = 3;
  newPosition = movePosition(iRow, iCol, iRound, numRow, numCol, numRotate, pointType);
  newPosition = movePosition(newPosition.y, newPosition.x, iRound, numRow, numCol, newPosition.numRotate, pointType + 1);
  newPosition = movePosition(newPosition.y, newPosition.x, iRound, numRow, numCol, newPosition.numRotate, pointType + 2);
  newPosition = movePosition(newPosition.y, newPosition.x, iRound, numRow, numCol, newPosition.numRotate, pointType + 3);
  newPosition = movePosition(newPosition.y, newPosition.x, iRound, numRow, numCol, newPosition.numRotate, pointType + 4);
  newPosition = movePosition(newPosition.y, newPosition.x, iRound, numRow, numCol, newPosition.numRotate, pointType + 5);

  return newPosition;
}

function calcRunPoint(runPoint, iRound, numRow, numCol) {
  const maxRowRound = numRow - iRound - 1;
  const maxColRound = numCol - iRound - 1;
  if(runPoint.x === iRound && runPoint.y < maxRowRound) {
    runPoint.y++;
  } else if(runPoint.y === maxRowRound && runPoint.x < maxColRound) {
    runPoint.x++;
  } else if(runPoint.x === maxColRound && runPoint.y > iRound) {
    runPoint.y--;
  } else if(runPoint.y === iRound && runPoint.x > iRound) {
    runPoint.x--;
  }
  return runPoint;
}

function rotateMatrix(matrix, numRow, numCol, numRotate) {
  let runPoint = {y: 0, x: 0};
  let leftTopPoint = {y: 0, x: 0};
  let rightBotPoint = {y: numRow - 1, x: numCol - 1};
  let iRound = 0;
  let numRotateMin = calcNumRotateMin(iRound, numRow, numCol, numRotate);
  const rotatedMatrix = new Array(numRow);
  for(let i = 0; i < numRow; i++) {
    rotatedMatrix[i] = [];
  }

  while(rightBotPoint.y - leftTopPoint.y >= 0 && rightBotPoint.x - leftTopPoint.x >= 0) {
    const newPosition = calcNewPosition(runPoint.y, runPoint.x, iRound, numRow, numCol, numRotateMin);
    rotatedMatrix[newPosition.y][newPosition.x] = matrix[runPoint.y][runPoint.x];
    runPoint = calcRunPoint(runPoint, iRound, numRow, numCol);
    if(runPoint.y === leftTopPoint.y && runPoint.x === leftTopPoint.x) {
      runPoint.y = iRound + 1;
      runPoint.x = iRound + 1;
      iRound += 1;
      leftTopPoint.y += 1;
      leftTopPoint.x += 1;
      rightBotPoint.y -= 1;
      rightBotPoint.x -= 1;
      numRotateMin = calcNumRotateMin(iRound, numRow, numCol, numRotate);
    }
  }
  return rotatedMatrix;
}

// Complete the matrixRotation function below.
function matrixRotation(matrix, m, n, r, expectedResult) {
  const rotatedMatrix = rotateMatrix(matrix, m, n, r);

  rotatedMatrix.forEach((row) => {
    const concatedRow = row.reduce((acc, str) => acc.concat(str + ' '), '');
    console.log(concatedRow.trim());
    console.log('');
  })
}

function readInputFile(readResultFile, matrixRotation) {
  let iLine = 0;
  let matrix, m, n, r;
  lineReader.eachLine('data', function(line, last) {
    if(iLine === 0) {
      const firstLineInfos = line.split(' ');
      m = Number(firstLineInfos[0]);
      n = Number(firstLineInfos[1]);
      r = Number(firstLineInfos[2]);
      matrix = Array(m);
      iLine++;
    } else {
      matrix[iLine - 1] = line.split(' ');
      iLine++;
    }
    if(last) {
      readResultFile(matrixRotation, matrix, m, n, r);
    }
  });
}

function readResultFile(matrixRotation, matrix, m, n, r) {
  const expectedResult = Array(m);
  let iLine = 0;
  lineReader.eachLine('expectedResult', function(line, last) {
    expectedResult[iLine++] = line.split(' ');
    if(last) {
      matrixRotation(matrix, m, n, r, expectedResult);
    }
  });
}

async function main() {
  // const mnr = readLine().split(' ');
  //
  // const m = parseInt(mnr[0], 10);
  //
  // const n = parseInt(mnr[1], 10);
  //
  // const r = parseInt(mnr[2], 10);
  //
  // let matrix = Array(m);
  //
  // for (let i = 0; i < m; i++) {
  //   matrix[i] = readLine().split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
  // }
  //
  // matrixRotation(matrix, m, n, r);

  readInputFile(readResultFile, matrixRotation);
}
