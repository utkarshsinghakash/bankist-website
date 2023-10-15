'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displaymovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `        <div class="movements__row">
         <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
         
         <div class="movements__value">${mov} EUR</div>
       </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calprintbalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, cur, i, ar) {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const createusername = function (acc) {
  acc.forEach(function (accs) {
    accs.username = accs.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};
createusername(accounts);

const displaysummary = function (acc) {
  const income = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    });
  labelSumIn.textContent = `${income} EUR`;

  const outcome = acc.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    });
  labelSumOut.textContent = `${Math.abs(outcome)} EUR`;

  const interest = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (deposit) {
      return (deposit * acc.interestRate) / 100;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    });

  labelSumInterest.textContent = `${interest} EUR`;
};

const updateUI = function (acc) {
  //display movement
  displaymovements(acc.movements);
  //display balance
  calprintbalance(acc);
  //display summary
  displaysummary(acc);
};

let currentuser;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentuser = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });

  console.log(currentuser);

  if (currentuser?.pin === Number(inputLoginPin.value)) {
    //display ui and messgae
    labelWelcome.textContent = `Welcome back,${
      currentuser.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //initial blur
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentuser);
  }
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displaymovements(currentuser.movements, !sorted);
  sorted = !sorted;
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveracc = accounts.find(function (acc) {
    return inputTransferTo.value === acc.username;
  });

  if (
    amount > 0 &&
    receiveracc &&
    currentuser.balance >= amount &&
    receiveracc?.username !== currentuser.username
  ) {
    //tranfer details
    currentuser.movements.push(-amount);
    receiveracc.movements.push(amount);
    updateUI(currentuser);
    inputTransferAmount.value = inputTransferTo.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentuser.username &&
    Number(inputClosePin.value) === currentuser.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentuser.username;
    });
    console.log(index);
    //delete the account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
    //set to zero
    inputCloseUsername.value = inputClosePin.value = '';
  }
  //inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentuser.movements.some(function (acc) {
      return acc >= 0.1 * amount;
    })
  ) {
    currentuser.movements.push(amount);
    //u[date UI]
    updateUI(currentuser);
    //loan to zero
    inputLoanAmount.value = '';
  }
});
//console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//slice
/*let ar = ['a', 'b', 'c', 'd', 'e'];
console.log(ar.slice(2));
console.log(ar.slice(-2));
console.log(ar.slice(2, -2));
console.log([...ar]);

//splice-mutate
console.log(ar.splice(2));
console.log(ar);

//reverse
let arr = ['e', 'd', 'c', 'b', 'a'];
console.log(arr.reverse());
//concatinate
const letter = ar.concat(arr);
console.log(letter);
console.log([...ar, ...arr]);
//join
console.log(letter.join('-'));
*/

/*for (const movement of movements) {
  if (movement > 0) {
    console.log(`deposted ${movement}`);
  } else {
    console.log(`withdrawn ${movement}`);
  }
}
console.log('---for each---');
movements.forEach(function (i) {
  if (i > 0) {
    console.log(`deposted ${i}`);
  } else {
    console.log(`withdrawn ${Math.abs(i)}`);
  }
});*/
/*const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});

const currenciesunique = new Set(['USD', 'EUR', 'GBP']);
console.log(currenciesunique);
currenciesunique.forEach(function (value, _, map) {
  console.log(`${value}:${value}`);
});*/

//convert euro into usd
/*const eurotousd = 1.1;

const movementsusd = movements.map(function (mov) {
  return mov * eurotousd;
});
console.log(movements);
console.log(movementsusd);

const movementsUsd = [];
for (const mov of movements) {
  movementsUsd.push(mov * eurotousd);
}
console.log(movementsUsd);
*/
//const user = 'Steven Thomas Williams';

/*const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

const withdrawel = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawel);*/

/*const balance = movements.reduce(function (acc, cur, i, ar) {
  return acc + cur;
}, 0);
console.log(balance);*/

/*const max = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(max);*/

/*const eurotousd = 1.1;

const totaldepositUSD = movements
  .filter(function (mov) {
    return mov > 0;
  })
  .map(function (mov, i) {
    return mov * eurotousd;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  });
console.log(totaldepositUSD);*/

/*console.log(
  movements.some(function (acc) {
    return acc > 0;
  })
);
console.log(
  movements.every(function (acc) {
    return acc > 0;
  })
);
console.log(movements.includes(-130));

const deposit = function (acc) {
  return acc > 0;
};
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

const ar = [[[1, 2], 3][(5, 6)]];
console.log(ar.flat(2));

const accountmovements = accounts.map(function (acc) {
  return acc.movements;
});
const flat = accountmovements.flat();
console.log(flat);
const overall = flat.reduce(function (acc, cur) {
  return acc + cur;
});
console.log(overall);
const balance = accounts
  .map(function (acc) {
    return acc.movements;
  })
  .flat()
  .reduce(function (acc, cur) {
    return acc + cur;
  });
console.log(balance);

const balances = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .reduce(function (acc, cur) {
    return acc + cur;
  });
console.log(balances);*/

/*const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

console.log(movements);
movements.sort(function (a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
});
console.log(movements);

movements.sort(function (a, b) {
  return a - b;
});
console.log(movements);*/

//fill method to creatw new array
// console.log(new Array(1, 2, 3, 4, 5, 6));
// const x = new Array(5);
// console.log(x);

// x.fill(1);
// x.fill(12, 3, 5);
// console.log(x);

// //from method
// const y = Array.from({ length: 7 }, function (_, i) {
//   return i + 1;
// });
// console.log(y);
