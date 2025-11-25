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

