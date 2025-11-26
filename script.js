let randomNumber = Math.floor(Math.random() * 100) + 1;

const guessField = document.getElementById("guessField");
const guessSubmit = document.querySelector(".guessSubmit");
const lastChoice = document.querySelector(".lastChoice");
const lowOrHigh = document.querySelector(".lowOrHigh");
const previousChoices = document.querySelector(".previousChoices");
const results = document.querySelector(".results");

let attempts = 1;
let resetButton;

// function to check the user's guess -> checks the number chosen by ther user and responds accordingly
const checkNumberGuess = () => {
	const userChoice = Number(guessField.value);

	if (!userChoice || userChoice < 1 || userChoice > 100) {
		lowOrHigh.textContent = "Please enter a number between 1 and 100.";
		guessField.value = "";
		return;
	}

	if (attempts === 1) {
		previousChoices.textContent = "Previous choices: ";
	}
	previousChoices.textContent += userChoice + " - ";

	if (userChoice === randomNumber) {
		lastChoice.classList.remove("incorrect");
		lastChoice.classList.add("correct");
		lastChoice.textContent = "You got it!";

		lowOrHigh.textContent = "";

		setGameOver();
	} else if (attempts === 10) {
		lastChoice.textContent = "Game Over!";
		lowOrHigh.textContent = `The number was ${randomNumber}.`;
		previousChoices.textContent = "";
		setGameOver();
	} else {
		lastChoice.classList.remove("correct");
		lastChoice.classList.add("incorrect");
		lastChoice.textContent = "wrong";
		if (userChoice < randomNumber) {
			lowOrHigh.textContent = "Your guess is too low!";
		} else {
			lowOrHigh.textContent = "Your guess is too high!";
		}
	}

	attempts++;
	guessField.value = "";
	guessField.focus();
};

// function to declare the end of the game
const setGameOver = () => {
	guessField.disabled = true;
	guessSubmit.disabled = true;

	resetButton = document.createElement("button");
	resetButton.classList.add("resetButton");
	resetButton.textContent = "Try Again";
	results.appendChild(resetButton);

	resetButton.addEventListener("click", resetGame);
};

// function to reset the game
const resetGame = () => {
	attempts = 1;
	const resultsParagraphs = document.querySelectorAll(".results p");
	for (const element of resultsParagraphs) {
		element.textContent = "";
	}
	resetButton.parentNode.removeChild(resetButton);

	guessField.disabled = false;
	guessSubmit.disabled = false;
	guessField.value = "";
	guessField.focus();

	randomNumber = Math.trunc(Math.random() * 100) + 1;
};

guessSubmit.addEventListener("click", (e) => {
	e.preventDefault();
	checkNumberGuess();
});

guessField.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		checkNumberGuess();
	}
});
