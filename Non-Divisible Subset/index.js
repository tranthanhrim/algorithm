function nonDivisibleSubset(k, s) {
  const length = s.length;
  const nonDivisibleObj = {};
  const remainders = {};
  for(let i = 0; i < k; i++) remainders[i] = 0;
  s.forEach(num => {
    remainders[num % k] += 1;
  });
  console.log('remainders: ', remainders);
  // const remainderArr = Object.values(remainders);
  let count = Math.min(remainders[0], 1);
  console.log(count);
  const middlePoint = Math.floor(k / 2) + 1;
  console.log('middlePoint: ', middlePoint);
  for(let i = 1; i < middlePoint; i++) {
    if (i !== k - i) {
      count += Math.max(remainders[i], remainders[k - i]);
    }
  }
  console.log(count);

  if (k % 2 === 0) count += Math.min(remainders[Math.floor(k / 2)], 1);

  return count;
}

// console.log(nonDivisibleSubset(5, [1, 2, 3, 6, 7, 8, 10, 12, 13, 14, 15, 17, 20, 28, 30, 31, 33, 35]));
console.log(nonDivisibleSubset(3, [1, 7, 2, 4]));