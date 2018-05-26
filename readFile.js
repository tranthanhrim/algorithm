var lineReader = require('line-reader');

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