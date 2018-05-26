function cost(arr) {
  let cost = 0;
  const length = arr.length;
  if (arr.length >= 2) {
    const oneHead = arr[1] - 1;
    const oneTail = arr[0] - 1;
    const normal = Math.abs(arr[1] - arr[0]);
    const max = Math.max(oneHead, oneTail, normal);
    cost += max;
    if (max !== normal && max === oneTail) arr[1] = 1;
    else if (max !== normal && max === oneHead) arr[0] = 1;
  }
  for(let i = 1; i < length - 1; i++) {
    const oneTail = arr[i] - 1;
    const normal = Math.abs(arr[i] - arr[i + 1]);
    const max = Math.max(oneTail, normal);
    console.log('max: ', max);
    console.log('normal: ', normal);
    cost += max;
    if (max !== normal && max === oneTail) arr[i + 1] = 1;
    // console.log('cost: ', cost);
  }
  console.log('arr: ', arr);
  return cost;
}