function pairs(k, a) {
  const arrSorted = a.sort((a, b) => { return a - b });
  const arrLength = a.length;
  let resultObj = {};
  for (let i = 0; i < arrLength - 1; i++) {
    if (arrSorted[i] > k) break;
    for (let j = i + 1; j < arrLength; j++) {
      if (arrSorted[j] > k) break;
      if (arrSorted[i] + arrSorted[j] === k) {
        resultObj[`${arrSorted[i]} ${arrSorted[j]}`] = k;
        break;
      }
    }
  }
  return Object.keys(resultObj).length;
}

// const arr = [1,2,3,6,7,8,9,1];
// console.log(pairs(10, arr));

function arrange(sentence) {
  const words = sentence.substring(0, sentence.length - 1).split(' ');
  if (words.length === 1 || words.length === 0) return sentence;
  const firstWord = words[0];
  words.sort((a, b) => { return a.length - b.length });

  const firstWordIndex = words.findIndex(word => word === firstWord);
  console.log('firstWordIndex: ', firstWordIndex);
  if (firstWordIndex !== 0) {
    words[firstWordIndex] = words[firstWordIndex].toLowerCase();
  }
  words[0] = `${words[0][0].toUpperCase()}${words[0].slice(1)}`;

  return words.join(' ').concat('.');
}

console.log('arrange: ', arrange('Amm hi amm hia ammm.'));