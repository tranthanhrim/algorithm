function findDecentNumber(number) {
  if (number === 1) return -1;
  if (number === 2) return -1;
  if (number === 3) return '555';
  if (number === 4) return -1;

  let totalNumDivisibleBy5 = Math.floor(number / 5);

  let m = 0; // find m satisfy m % 5 = 0
  let n = number - m; // find n satisfy n % 3 = 0, n is as big as possible
  while ((m + n !== number || m % 5 !== 0 || n % 3 !== 0) && m < totalNumDivisibleBy5 * 5) {
    console.log('m n : ', m, n);
    m += 5;
    n = number - m;
  }
  if (m + n !== number || m % 5 !== 0 || n % 3 !== 0) return -1;
  let result = '';
  if (n > 0) result = result.concat('5'.repeat(n))
  if (m > 0) result = result.concat('3'.repeat(m))
  return result;
}
