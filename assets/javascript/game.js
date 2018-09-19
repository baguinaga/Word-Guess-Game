var wordList = ["acres", "adult", "advice", "arrangement", "attempt", "august", "autumn", "border", "breeze", "brick", "calm", "canal", "casey", "cast", "chose", "claws", "coach", "constantly", "contrast", "cookies", "customs", "damage", "danny", "deeply", "depth", "discussion", "doll", "donkey", "egypt", "ellen", "essential", "exchange", "exist", "explanation", "facing", "film", "finest", "fireplace", "floating", "folks", "fort", "garage", "grabbed", "grandmother", "habit", "happily", "harry", "heading", "hunter", "illinois", "image", "independent", "instant", "january", "kids", "label", "lee", "lungs", "manufacturing", "martin", "mathematics", "melted", "memory", "mill", "mission", "monkey", "mount", "mysterious", "neighborhood", "norway", "nuts", "occasionally", "official", "ourselves", "palace", "pennsylvania", "philadelphia", "plates", "poetry", "policeman", "positive", "possibly", "practical", "pride", "promised", "recall", "relationship", "remarkable", "require", "rhyme", "rocky", "rubbed", "rush", "sale", "satellites", "satisfied", "scared", "selection", "shake", "shaking", "shallow", "shout", "silly", "simplest", "slight", "slip", "slope", "soap", "solar", "species", "spin", "stiff", "swung", "tales", "thumb", "tobacco", "toy", "trap", "treated", "tune", "university", "vapor", "vessels", "wealth", "wolf", "zoo"];

var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

//javascript variables

var wordArr = wordRandom();
var wordHidden = "_".repeat(wordArr.length).split("")
var wrongGuesses = [];


var lives = 10;
var wins = 0;
var losses = 0;
var gameState = true;

// element references

var wordHTML = document.getElementById("gameWord");
var winsHTML = document.getElementById("gameWins");
var lossesHTML = document.getElementById("gameLosses");
var livesHTML = document.getElementById("gameLives");
var guessesHTML = document.getElementById("gameGuesses");
var messageHTML = document.getElementById("gameMessage");

//functions

//random word function, used to store temp random word to wordArr as an array
function wordRandom() {
  return wordList[Math.floor(Math.random() * wordList.length)].split("");
}

// function used to check the userinput array agaisnt the key array and modify the container array

function wordReveal(key, container, input) {
  for (var i = 0; i < key.length; i++) {
    if (key[i] === input) {
      container[i] = key[i];
    };
  };
}

//fuction that resets initial HTML/JS values

function resetGame() {
  wordArr = wordRandom();
  wordHidden = "_".repeat(wordArr.length).split("");
  lives = 10;
  gameState = true;
  wrongGuesses = [];
  livesHTML.textContent = lives;
  wordHTML.textContent = wordHidden.join(" ");
  guessesHTML.textContent = wrongGuesses.join(" ");
  messageHTML.textContent = "Can you guess the hidden word?";
}

//testing console.log for wordArr and wordHidden (shows initial answer)

console.log(wordHidden, wordArr);

//setting the initial hidden word to the document

wordHTML.textContent = wordHidden.join(" ");

//event function, testing user input key, and checking if the letter is in wordArr (running game logic)

document.onkeyup = function (e) {

  //define user input at userkey

  var userKey = e.key;

  //check to see if userKey is a letter (can be improves with key input range)

  if (letters.includes(userKey) && gameState === true) {
    messageHTML.textContent = "Can you guess the hidden word?"

    //check to see if usey key is located inside the word

    if (wordArr.includes(userKey) && !wrongGuesses.includes(userKey)) {
      wordReveal(wordArr, wordHidden, userKey);
      wrongGuesses.push(userKey);

      //checks if the user won based on if the container arrary still has "_".

      if (!wordHidden.includes("_")) {
        messageHTML.textContent = "Congratulations, you won! Press Enter to play again.";
        wins++;
        gameState = false;
      } 

      //checking if the user has tried that letter previously

    } else if (wrongGuesses.includes(userKey)) {
      messageHTML.textContent = "You've tried that letter before... Try again.";

      //pushes the wrong guess to wrongGuesses array

    } else if (!wordArr.includes(userKey)) {
      wrongGuesses.push(userKey);
      lives--;

      //checking for losses and setting the gameState to false

      if (lives === 0) {
        messageHTML.textContent = "You lost. Press Enter to play again.";
        losses++;
        gameState = false;
      }
    }

    //resetting the game if gameState is false(loss) and the user presses Enter

  } else if (userKey === "Enter" & gameState === false) {
    resetGame();

    //else statement if user does not input a letter

  } else {
    messageHTML.textContent = "That's not a letter. Sorry, try again.";
    if (gameState === false) {
      messageHTML.textContent = "Press the Enter key to play again.";
    }
  }

  //writting to the page at the end of the logic sequence 

  wordHTML.textContent = wordHidden.join(" ");
  winsHTML.textContent = wins;
  lossesHTML.textContent = losses;
  livesHTML.textContent = lives;
  guessesHTML.textContent = wrongGuesses.join(" ");

  //reveal the word if the game is over (for the loss condition)

  if (gameState === false) {
    wordHTML.textContent = wordArr.join(" ");
  }

  //logging for testing purposes

  console.log(wordArr, wordHidden);
}