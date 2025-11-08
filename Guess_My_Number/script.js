// => Dom And Dom manipulation
// => Selector
// => Events
// Math Methods =>Random , => Trunc , =>Floor , => Ceil , => Round , => Max , => Min , => Pow , => Sqrt , => Abs
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;
const displayMessage= (message) =>{
  document.querySelector(".message").textContent = message;
}
document.querySelector(".check").addEventListener("click", function () {
  let guess = +document.querySelector("#guess").value;
  if (!guess) {
     displayMessage("⛔No Number !");
  }else if(guess !== secretNumber){
     if (score > 1) {
      score--;
      guess < secretNumber ? displayMessage("📉 Too Low !")  : displayMessage("📈 Too High !");
      document.querySelector("#score").textContent = score;
    } else {
      displayMessage("💥 You Lost The Game !");
      document.querySelector("#score").textContent = 0;
      document.querySelector(".check").disabled = true;
    }
  }
  
  else if (guess === secretNumber) {
    displayMessage( "🎉 Correct Number !");
    document.querySelector("#theNumber").textContent = secretNumber;
    document.querySelector(".Game").style.backgroundColor = "#60b347";
    if (score > highscore) {
      highscore = score;
      document.querySelector("#highscore").textContent = highscore;
    }
    document.querySelector(".check").disabled = true;
  }
});

document.querySelector("#again").addEventListener("click", function () {
  score = 20;
  document.querySelector("#guess").value = '';
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector(".Game").style.backgroundColor = "black";
  document.querySelector("#theNumber").textContent = "?";
  displayMessage("🎉 Start guessing ...") ;
  document.querySelector("#score").textContent = "20";
  document.querySelector(".check").disabled = false;
});
