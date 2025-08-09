// Rock Paper Scissors - Foundations project
// All console-based, uses prompt() for human input and console.log for output.

/**
 * Returns a random choice: "rock", "paper" or "scissors"
 */
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * choices.length); // 0, 1 or 2
  return choices[index];
}

/**
 * Prompts the user for input until they provide a valid choice.
 * Returns "rock", "paper", or "scissors".
 * If the user clicks Cancel, returns null (caller can handle cancellation).
 */
function getHumanChoice() {
  while (true) {
    const raw = prompt("Enter your choice: rock, paper, or scissors").trim();
    if (raw === null) {
      // user clicked Cancel
      return null;
    }

    const choice = raw.toLowerCase();
    if (choice === "rock" || choice === "paper" || choice === "scissors") {
      return choice;
    }

    // invalid input — notify and reprompt
    alert('Invalid choice. Please type "rock", "paper", or "scissors".');
  }
}

/**
 * Decides round winner.
 * Returns:
 * - 'tie' if same choice
 * - 'human' if human wins
 * - 'computer' if computer wins
 */
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) return "tie";

  // Mapping: key beats value
  const winsAgainst = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (winsAgainst[humanChoice] === computerChoice) {
    return "human";
  } else {
    return "computer";
  }
}

/**
 * Plays 5 rounds and reports scores.
 * You can change rounds variable to play different number of rounds.
 */
function playGame() {
  let humanScore = 0;
  let computerScore = 0;
  const rounds = 5;

  console.log("--- Rock Paper Scissors: Best of " + rounds + " rounds ---");

  for (let round = 1; round <= rounds; round++) {
    const humanChoice = getHumanChoice();
    if (humanChoice === null) {
      console.log("Game cancelled by the user.");
      return; // stop the game if user cancels
    }

    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);

    if (result === "tie") {
      console.log(`Round ${round}: Tie! Both chose ${humanChoice}.`);
    } else if (result === "human") {
      humanScore++;
      console.log(
        `Round ${round}: You win! ${humanChoice} beats ${computerChoice}.`
      );
    } else {
      computerScore++;
      console.log(
        `Round ${round}: You lose! ${computerChoice} beats ${humanChoice}.`
      );
    }

    console.log(
      `Score after round ${round}: You ${humanScore} - Computer ${computerScore}`
    );
  }

  // Final result
  console.log("--- Final Result ---");
  if (humanScore > computerScore) {
    console.log(
      `You are the overall winner! Final score: You ${humanScore} - Computer ${computerScore}`
    );
  } else if (computerScore > humanScore) {
    console.log(
      `Computer wins the game. Final score: You ${humanScore} - Computer ${computerScore}`
    );
  } else {
    console.log(
      `The game is a tie! Final score: You ${humanScore} - Computer ${computerScore}`
    );
  }
}

// Start the game automatically when the script loads.
playGame();
