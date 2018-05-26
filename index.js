function asciiDif(a,b) {
  return Math.abs(a.charCodeAt(0) - b.charCodeAt(0));
}

function funnyString(s) {
  const reverseStr = s.split("").reverse().join("");
  console.log('reverseStr: ', reverseStr);
  const sLength = s.length;
  let isFunny = 'Funny';
  for(let i = 1; i < sLength; i++) {
    if (asciiDif(s[i], s[i - 1]) !== asciiDif(reverseStr[i], reverseStr[i - 1])) {
      isFunny = 'Not Funny';
      break;
    }
  }
  return isFunny;
}

console.log(funnyString('acxz'));