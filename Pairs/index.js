function pairs(k, arr) {
  const arrSorted = arr.sort((a, b) => { return a - b })
  const arrLength = arr.length;
  let i = 0, j = 1, count = 0 ;
  while(j < arrLength) {
    const diff = arrSorted[j] - arrSorted[i];
    if (diff === k) {
      j++;
      count++;
    } else if (diff > k) {
      i++;
    } else if (diff < k) {
      j++;
    }
  }
  return count;
}

const arr = [1, 5, 3, 4, 2];
console.log(pairs(3, arr));