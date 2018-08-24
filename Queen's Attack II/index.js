// Queen's Attack II
function queensAttack(n, k, r_q, c_q, obstacles) {
  const qGreater = Math.max(r_q, c_q);
  const qLessthan = Math.min(r_q, c_q);
  let allPosAttackable = 2*n - 2 + (n - qGreater + qLessthan - 1) + Math.min(n - r_q, c_q - 1) + Math.min(n - c_q, r_q - 1);
  const filterObstacles = {
    'row_left': null,
    'row_right': null,
    'col_top': null,
    'col_bot': null,
    'diagonal_top_left': null,
    'diagonal_top_right': null,
    'diagonal_bot_left': null,
    'diagonal_bot_right': null,
  };
  filterObstacles

  obstacles.forEach((obstacle) => {
    if (obstacle[0] === r_q) {
      allPosAttackable -= obstacle[1] < c_q ? obstacle[1] : (n - obstacle[1] + 1);
    } else if (obstacle[1] === c_q) {
      allPosAttackable -= obstacle[0] < r_q ? obstacle[0] : (n - obstacle[0] + 1);
    } else if (r_q - obstacle[0] === c_q - obstacle[1]) {
      if (r_q - obstacle[0] > 0) {
        allPosAttackable -= Math.min(...obstacle);
      } else allPosAttackable -= (n - Math.max(...obstacle) + 1);
    } else if (Math.abs(r_q - obstacle[0]) === Math.abs(c_q - obstacle[1])) {
      if (r_q - obstacle[0] > 0) {
        allPosAttackable -= Math.min(n - obstacle[1], r_q - 1);
      } else allPosAttackable -= Math.min(n - obstacle[0], c_q - 1);
    }
    console.log(obstacle, allPosAttackable);
  });
  return allPosAttackable;
}

// console.log(queensAttack(5, 3, 4, 3, [ [ 5, 5 ], [ 4, 2 ], [ 2, 3 ] ]));
console.log(queensAttack(8, 0, 5, 4, []));