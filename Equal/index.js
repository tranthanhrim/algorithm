function numOps(n) {
  let result = 0;
  result += Math.floor(n/5);
  n %= 5;
  result += Math.floor(n/2);
  n %= 2;
  result += n;
  return result;
}

function equal(rawArr) {
  const arr = rawArr.sort((a, b) => a - b);
  console.log('arr: ', arr);
  const n = arr.length;
  let min = arr[0];
  let answer = -1;
  console.log(min);
  for(let i = 0; i < 4; i++) {
    let tmpAnswer = 0;
    for(let j = 0; j < n; j++) {
      tmpAnswer += numOps(arr[j] - min + i);
    }
    if(tmpAnswer < answer || answer === -1) {
      answer = tmpAnswer;
    }
  }
  return answer;
}

equal([2, 2, 3, 7]);