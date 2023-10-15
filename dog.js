const juliadog = [3, 5, 2, 12, 7];
const katedog = [4, 1, 15, 8, 3];

const checkdogs = function (ar1, ar2) {
  const ar3 = ar2.slice(1, -2);

  ar1.forEach(function (mov, i) {
    if (mov >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult ,and it is ${mov} years old`
      );
    } else {
      console.log(`Dog number ${i + 1} is still a puppy `);
    }
  });
  ar3.forEach(function (mov, i) {
    if (mov >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult ,and it is ${mov} years old`
      );
    } else {
      console.log(`Dog number ${i + 1} is still a puppy `);
    }
  });
};
checkdogs(juliadog, katedog);
