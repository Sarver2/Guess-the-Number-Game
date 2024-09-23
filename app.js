document.addEventListener("DOMContentLoaded", function () {
  const start = document.querySelector(".start");

  const navigate = () => {
    location.href = `game.html`;
  };

  if (start) {
    start.addEventListener("click", navigate);
  }

  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const h1 = document.querySelector("h1");
  const container = document.querySelector(".container");
  const body = document.querySelector("body");
  const remaining = document.querySelector(".remaining");
  const submit = document.querySelector(".submit");
  const previousGuess = document.querySelector(".previous-guess");
  const rightNum = document.querySelector(".rightNum");
  const heading = document.querySelector(".heading");

  const randNum = Math.floor(Math.random() * 100) + 1;
  console.log(randNum);

  let prevGuess = [];
  let playGame = true;
  let attempt = 1;
  let numGuess = 0;

  if (playGame) {
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const guess = parseInt(input.value);
      validateInput(guess);
      checkGuess(guess);
      allGuess(guess);
    });
  }

  const validateInput = (guess) => {
    if (isNaN(guess)) {
      h1.innerHTML = `please enter a valid number`;
    } else if (guess < 1) {
      h1.innerHTML = `number should be 1 or greater`;
    } else if (guess > 100) {
      h1.innerHTML = `number should be 100 or less`;
    }
  };

  const checkGuess = (guess) => {
    prevGuess.push(guess);
    if (guess < randNum) {
      h1.innerHTML = `too Low`;
    } else if (guess > randNum) {
      h1.innerHTML = `too high`;
    } else if (guess === randNum) {
      h1.innerHTML = `you guess it right and it took you ${attempt++} attempts`;
      heading.innerHTML = `<h2> WINNER WINNER CHICKEN DINNER </h2>`;
      submit.innerHTML = `Restart`;
      input.setAttribute("disabled", "");
      submit.setAttribute("disabled", "");
      playGame = false;
      newGame();
    }
    input.value = "";
    attempt++;
    numGuess++;
    attempts(numGuess);
  };

  const attempts = (numGuess) => {
    if (numGuess === 10) {
      input.setAttribute("disabled", "");
      submit.setAttribute("disabled", "");
      h1.innerHTML = "Game Over";
      rightNum.innerHTML = `Right number was ${randNum}`;
      newGame();
    }
    input.value = "";
    remaining.innerHTML = `${10 - numGuess}`;
  };

  const allGuess = (guess) => {
    previousGuess.innerHTML += `${guess}, `;
  };

  const newGame = () => {
    const restart = document.querySelector(".refresh");
    restart.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i>`;
    restart.addEventListener("click", function () {
      location.reload();
    });
  };
});
