// Bear and Steady Gene
function steadyGene(str) {
  let n = str.length;
  let i=0, j=n-1, minl=n;
  let cnt = { A: 0, C: 0, T: 0, G: 0 };
  while (1)
  {
    if (j<0 || cnt[str[j]]==n/4)
    {
      j++;
      break;
    }
    else
    {
      cnt[str[j]]++;
      j--;
    }
  }
  console.log('cnt: ', cnt);
  if (j < minl)
    minl = j;
  console.log('minl: ', minl);
  for (i=0; i<n; i++)
  {
    cnt[str[i]]++;
    while (j<n && cnt[str[i]] > n/4)
    {
      cnt[str[j]]--;
      j++;
    }
    if (j==n)
      break;
    if (j-i-1 < minl)
      minl = j-i-1;
  }
  return minl;
}

steadyGene('GAAATAAA');