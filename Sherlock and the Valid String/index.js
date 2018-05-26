function isValid(s) {
  const letterCounts = {};
  const sLength = s.length;
  for(let i = 0; i < sLength; i++) {
    if (!letterCounts[s[i]]) letterCounts[s[i]] = 1;
    else letterCounts[s[i]]++;
  }
  console.log('letterCounts: ', letterCounts);

  const numLetterGrouped = {};
  for(let letter in letterCounts) {
    if (!numLetterGrouped[letterCounts[letter]]) numLetterGrouped[letterCounts[letter]] = [letter];
    else numLetterGrouped[letterCounts[letter]].push(letter);
  }
  console.log('numLetterGrouped: ', numLetterGrouped);

  const numLetterKeys = Object.keys(numLetterGrouped);

  const numLetterGroupedLength = numLetterKeys.length;
  if (numLetterGroupedLength === 1) return 'YES';
  if (numLetterGroupedLength > 2) return 'NO';
  if (numLetterKeys[0] === '1' && numLetterGrouped[numLetterKeys[0]].length === 1) return 'YES';
  if (numLetterKeys[1] === '1' && numLetterGrouped[numLetterKeys[1]].length === 1) return 'YES';
  if (Math.abs(Number(numLetterKeys[0]) - Number(numLetterKeys[1])) === 1 &&
    (numLetterGrouped[numLetterKeys[0]].length === 1 || numLetterGrouped[numLetterKeys[1]].length === 1)
  ) {
    return 'YES';
  }
  return 'NO';
}

console.log(isValid('ibfdgaeadiaefgbhbdghhhbgdfgeiccbiehhfcggchgghadhdhagfbahhddgghbdehidbibaeaagaeeigffcebfbaieggabcfbiiedcabfihchdfabifahcbhagccbdfifhghcadfiadeeaheeddddiecaicbgigccageicehfdhdgafaddhffadigfhhcaedcedecafeacbdacgfgfeeibgaiffdehigebhhehiaahfidibccdcdagifgaihacihadecgifihbebffebdfbchbgigeccahgihbcbcaggebaaafgfedbfgagfediddghdgbgehhhifhgcedechahidcbchebheihaadbbbiaiccededchdagfhccfdefigfibifabeiaccghcegfbcghaefifbachebaacbhbfgfddeceababbacgffbagidebeadfihaefefegbghgddbbgddeehgfbhafbccidebgehifafgbghafacgfdccgifdcbbbidfifhdaibgigebigaedeaaiadegfefbhacgddhchgcbgcaeaieiegiffchbgbebgbehbbfcebciiagacaiechdigbgbghefcahgbhfibhedaeeiffebdiabcifgccdefabccdghehfibfiifdaicfedagahhdcbhbicdgibgcedieihcichadgchgbdcdagaihebbabhibcihicadgadfcihdheefbhffiageddhgahaidfdhhdbgciiaciegchiiebfbcbhaeagccfhbfhaddagnfieihghfbaggiffbbfbecgaiiidccdceadbbdfgigibgcgchafccdchgifdeieicbaididhfcfdedbhaadedfageigfdehgcdaecaebebebfcieaecfagfdieaefdiedbcadchabhebgehiidfcgahcdhcdhgchhiiheffiifeegcfdgbdeffhgeghdfhbfbifgidcafbfcd'));