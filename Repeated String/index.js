function repeatedString(s, n) {
  if (s === 'a') return n;
  const sLength = s.length;
  let aQtyInStr = 0;
  for(let i = 0; i < sLength; i++) {
    if (s[i] === 'a') aQtyInStr++;
  }

  const numBlock = Math.ceil(n / sLength);
  let result = aQtyInStr * numBlock;

  const strRedundantLength = numBlock * sLength - n;
  const lastBlockRemoved = s.substring(sLength - strRedundantLength);
  let aQtyRedundant = 0;
  const lastBlockRemovedLength = lastBlockRemoved.length;
  for(let i = 0; i < lastBlockRemovedLength; i++) {
    if (lastBlockRemoved[i] === 'a') aQtyRedundant++;
  }
  return result - aQtyRedundant;
}

console.log(repeatedString('aba', 10));