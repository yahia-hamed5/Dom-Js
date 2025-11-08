// => Dom And Dom manipulation
// => Selector
// => Events
// Math Methods =>Random , => Trunc , =>Floor , => Ceil , => Round , => Max , => Min , => Pow , => Sqrt , => Abs
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;
document.querySelector(".check").addEventListener("click", function () {
  let guess = +document.querySelector("#guess").value;
  if (!guess) {
    document.querySelector(".message").textContent = "⛔No Number !";
    0
  }else if(guess !== secretNumber){
     if (score > 1) {
      score--;
      document.querySelector(".message").textContent = guess < secretNumber ? "📉 Too Low !" : "📈 Too High !";
      document.querySelector("#score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "💥 You Lost The Game !";
      document.querySelector("#score").textContent = 0;
      document.querySelector(".check").disabled = true;
    }
  }
  
  else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "🎉 Correct Number !";
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
  document.querySelector(".message").textContent = "🎉 Start guessing ...";
  document.querySelector("#score").textContent = "20";
  document.querySelector(".check").disabled = false;
});
