// Default Parameters
const fullName = (first, sconde, therd) => {
  console.log(`Hi  : ${first + " " + sconde + " " + therd}`);
};
const one = "yahia";
fullName(one); // the return here =>( Hi  : yahia undefined undefined)
const newFullName = (
  first = "'No First Name'",
  sconde = "'No Sconde Name'",
  therd = "'No therd Name'"
) => {
  console.log(`Hi  : ${first + " " + sconde + " " + therd}`);
};
newFullName(one); //  the return here => ( Hi  : yahia 'No Sconde Name' 'No therd Name')

// -------------------------------------------------------

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
  console.log(this)
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    typeof answer === "number" && answer < this.answers.length && this.answers[answer]++;
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array'){
    if (type === 'array') {
      console.log(this.answers);
    }else if(type === 'string'){
      console.log(`Poll results are ${this.answers.join(',')}`)
    }
  }
};
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] },'string')
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] })
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] },'string');

// the defrence between call , apply and bind
// call => call method calls a function with a given this value and arguments provided individually.
// apply =>  The apply() method calls a function with a given this value, and arguments provided as an array (or an array-like object).
// bind => The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.body.addEventListener('click',function () {
    header.style.color = "blue";
  })
})()
