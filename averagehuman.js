const movements = [5, 2, 4, 1, 15, 8, 3];
const human = [];
let humanage = 0;
const calaveragehuman = function (movements) {
  movements.forEach(function (mov) {
    if (mov <= 2) {
      humanage = mov * 2;
      human.push(humanage);
    } else {
      humanage = 16 + mov * 4;
      human.push(humanage);
    }
  });
  console.log(human);
  const adults = human.filter(function (movement) {
    return movement > 18;
  });
  console.log(adults);
  /*const average = human.reduce(function (acc, mov, i, ar) {
    const avg = acc + mov;
    const t = avg / adults.length;
    return t;
  }, 0);
  console.log(average);*/
  let sum = 0;
  for (const i of adults) {
    sum = sum + i;
  }
  const avg = sum / adults.length;
  console.log(avg);
};
console.log(calaveragehuman(movements));
