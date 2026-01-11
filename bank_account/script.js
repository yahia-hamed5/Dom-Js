// simple array methods

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Handel Movemrents

const displayMovments = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs =sort ? acc.movements.toSorted((a,b)=> a - b) : acc.movements
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type}
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovments(account1);

// Handel Balance
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// displayBalance(account1);

// Handel Summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
  console.log(incomes, outcomes, interest);
};
// calcDisplaySummary(account1);

// Handle User Names
const createUserName = function (accs) {
  accs.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserName(accounts);

// update UI
const updateUI = function (acc) {
  displayMovments(acc);
  displayBalance(acc);
  calcDisplaySummary(acc);
};

// Handle Login
let currentAccount;
btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  const username = inputLoginUsername.value;
  const pin = +inputLoginPin.value;
  currentAccount = accounts.find(
    (acc) => acc.userName === username && acc.pin === pin
  );
  if (!currentAccount) return "";
  if (currentAccount?.pin === pin) {
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome Back , ${
      currentAccount.owner.split(" ")[0]
    }`;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
  console.log(currentAccount);
});

// transfer money
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const recieverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
});

// close account
btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  // const index = accounts.findIndex((acc)=>acc.userName === currentAccount.userName && acc.pin === currentAccount.pin);
  if (currentAccount.userName === username && currentAccount.pin === pin) {
    const index = accounts.findIndex((acc) => acc.userName === currentAccount.userName && acc.pin === currentAccount.pin);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
});

// hander loan
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});

// handel sort
let sorted = false;
btnSort.addEventListener('click',(event)=>{
  event.preventDefault();
  displayMovments(currentAccount,!sorted);
  sorted = !sorted;
})





/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/


const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

const huskyWeight = breeds.find(bread => bread.breed === 'Husky').averageWeight;
console.log(huskyWeight);
const dogBothActivities = breeds.find(breed =>breed.activities.includes('running') && breed.activities.includes('fetch'));
console.log(dogBothActivities);

const allActivities = breeds.flatMap( breed => breed.activities);
console.log(allActivities);

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

const swimmingAdjacent = [...new Set(breeds.filter(breed => breed.activities.includes('swimming')).flatMap(breed => breed.activities))]
console.log(swimmingAdjacent);

const allAbove10kg = breeds.every(breed => breed.averageWeight >= 10) ;
console.log(allAbove10kg);

const anyActiveBreed = breeds.some(breed => breed.activities.length >= 3);
console.log(anyActiveBreed);

const heaviest =breeds.map(breed => breed.averageWeight).find((weight, i, arr) => weight === Math.max(...arr));
console.log(heaviest);










// const displayMovments = function (movements) {
//   containerMovements.innerHTML = "";
//   movements.forEach((mov, i) => {
//     const type = mov > 0 ? "deposit" : "withdrawal";
//     const html = `
//         <div class="movements__row">
//           <div class="movements__type
//           movements__type--${type}">${i + 1} ${type}</div>
//           <div class="movements__value">${mov}</div>
//         </div>
//         `;
//     containerMovements.innerHTML += html;
//   });
// };
// displayMovments(account1.movements);
// const displaybalance = (movements) => {
//   const balance = movements.reduce((acc, mov) => acc + mov, 0);
//   labelBalance.textContent = `${balance} EUR `;
// };
// displaybalance(account1.movements);

// const calcDisplaySummary = (acc) => {
//   const incomes = acc.movements
//     .filter((mov) => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${incomes}€`;
//   const outcomes = acc.movements
//     .filter((mov) => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumOut.textContent = `${Math.abs(outcomes)}€`;
//   const interest = acc.movements
//     .filter((mov) => mov > 0)
//     .map((deposit) => (deposit * 1.2) / 100)
//     .filter((int) => int >= 1)
//     .reduce((acc, int) => acc + int, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };
// // calcDisplaySummary(account1.movements);
// const createUserNames = function (accs) {
//   accs.forEach((acc) => {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };
// createUserNames(accounts);
// console.log(accounts);

// // event handlers login
// let currentAccount
// btnLogin.addEventListener('click',(e)=>{
//   e.preventDefault();
//   const username = inputLoginUsername.value;
//   const pin = Number (inputLoginPin.value);
//   currentAccount = accounts.find(acc => acc.username === username && acc.pin === pin);
//   if (currentAccount?.pin === pin){
//     containerApp.style.opacity = 100;
//     labelWelcome.textContent = `Welcome Back , ${currentAccount.owner.split(' ')[0 ]}`;
//     inputLoginUsername.value = inputLoginPin.value = '';
//     inputLoginPin.blur();
//     displayMovments(currentAccount.movements);
//     displaybalance(currentAccount.movements);
//     calcDisplaySummary(currentAccount);
//   }
// })

// // transfer money
// btnTransfer.addEventListener('click',(e)=>{
//   e.preventDefault();
//   const amount = Number (inputTransferAmount.value);
//   const recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
//   console.log(amount,recieverAcc);
// });

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// // Simple array methods

// let names = ["yahia", "hamed", "kamal", "amine"];
// // SLICE
// console.log(names);
// console.log(names.slice(1));
// console.log(names);
// console.log(names.slice(1, 3));
// console.log(names);
// console.log(names.slice(-2));
// console.log(names);
// console.log(names.slice(-2, -1));

// // SPLICE
// console.log(names);
// console.log(names.splice(0, names.length - 1));
// console.log(names.splice(0, 3, "karem", "ali", "omar", "ahmed"));
// console.log(names);

// // REVERSE
// console.log(names.reverse());

// // CONCAT
// let mens = ["mohamed", "sayed", "adel"];
// let womens = ["sara", "dina", "mona"];
// let allNames = names.concat(mens).concat(womens);
// console.log(allNames);
// let allNames2 = [...names, ...mens, ...womens];
// console.log(allNames2);

// // JOIN
// console.log(allNames.join(" - "));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // just for of loop with value
// for (const el of movements) {
//   if (el > 0) {
//     console.log(`You deposited ${el}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(el)}`);
//   }
// }

// // just for of loop with value and index
// for (const [i, el] of movements.entries()) {
//   if (el > 0) {
//     console.log(`${i} => You deposited ${el}`);
//   } else {
//     console.log(`${i} => You withdrew ${Math.abs(el)}`);
//   }
// }

// console.log("---- FOREACH ----");
// // for each method with value , index and array
// movements.forEach(function (el, i, arr) {
//   if (el > 0) {
//     console.log(arr);
//     console.log(`${i} => You deposited ${el}`);
//   } else {
//     console.log(arr);
//     console.log(`${i} => You withdrew ${Math.abs(el)}`);
//   }
// });

// let arr = ["a", "b", "c", "d", "e"];
// console.log(arr[(1, 3, 4)]);
// console.log(arr.at(1));

// // challenge
// /*
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   const corrected = dogsJuliaCorrected.concat(dogsKate);
//   corrected.forEach((age, i) => {
//     if (age >= 3) {
//       console.log(`Dog number ${i} is an adult, and is ${age} years old"`);
//     } else {
//       console.log(`Dog number ${i} is still a puppy 🐶`);
//     }
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// const movementsEur = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1;

// // map and foreach method

// const movementsUSD = movementsEur.map((el) => el * euroToUsd);
// console.log(movementsUSD);
// console.log(movementsEur);

// // using filter method

// const deposits = movements.filter((mov) => mov > 0);
// console.log(deposits);
// const withdrawals = movements.filter((mov) => mov < 0);
// console.log(withdrawals);

// // reduce method
// const balance = movements.reduce((acc, mov) => acc + mov, 0);
// console.log(balance);

// // coding challenge 2

// /*
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */

// const calcAverageHumanAge = (ages) => {
//   const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter((age) => age >= 18);
//   const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length,0);
//   return average;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// // Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

// // TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// // TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// // GOOD LUCK 😀
// const calcAverageHumanAgeArrowChaning = (ages) =>  ages
//     .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter((age) => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// ;

// console.log(calcAverageHumanAgeArrowChaning([5, 2, 4, 1, 15, 8, 3]))
// console.log(calcAverageHumanAgeArrowChaning([16, 6, 10, 5, 6, 1, 4]))