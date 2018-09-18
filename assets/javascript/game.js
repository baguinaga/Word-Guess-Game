/* need to create a list of words
function that randomly selects a word upon loading, losing or winning
need to create a function that converts the word into underscores
  the hiddenword has to be displayed on the html document make this into a function
need to create an onkey listener that compares user input and word choosen 
if the it's not in the word then it is added to an array holding wrong letter guesses
  these letters are then written to the html document (use .join to display with spacing)
  the players lives are displayed on the html document
the user is not allowed to guess a previously submitted letter
  this is displayed to the player in a message
need to create a reset function that only runs upon winning or losing 
*/

var wordList = ["acres", "adult", "advice", "arrangement", "attempt", "august", "autumn", "border", "breeze", "brick", "calm", "canal", "casey", "cast", "chose", "claws", "coach", "constantly", "contrast", "cookies", "customs", "damage", "danny", "deeply", "depth", "discussion", "doll", "donkey", "egypt", "ellen", "essential", "exchange", "exist", "explanation", "facing", "film", "finest", "fireplace", "floating", "folks", "fort", "garage", "grabbed", "grandmother", "habit", "happily", "harry", "heading", "hunter", "illinois", "image", "independent", "instant", "january", "kids", "label", "lee", "lungs", "manufacturing", "martin", "mathematics", "melted", "memory", "mill", "mission", "monkey", "mount", "mysterious", "neighborhood", "norway", "nuts", "occasionally", "official", "ourselves", "palace", "pennsylvania", "philadelphia", "plates", "poetry", "policeman", "positive", "possibly", "practical", "pride", "promised", "recall", "relationship", "remarkable", "require", "rhyme", "rocky", "rubbed", "rush", "sale", "satellites", "satisfied", "scared", "selection", "shake", "shaking", "shallow", "shout", "silly", "simplest", "slight", "slip", "slope", "soap", "solar", "species", "spin", "stiff", "swung", "tales", "thumb", "tobacco", "toy", "trap", "treated", "tune", "university", "vapor", "vessels", "wealth", "wolf", "zoo"];

var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

//javascript variables
var wordArr = wordRandom();
var wordHidden = "_".repeat(wordArr.length).split("")
var wrongGuesses = [];

console.log(wordArr);
console.log(wordHidden);

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


//re-setting initial HTML/js values

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

//testing console.log
console.log(wordHidden, wordArr);

wordHTML.textContent = wordHidden.join(" ");

//event function, testing for matching letter and runnign game logic
document.onkeyup = function (e) {
  //define user input at userkey
  var userKey = e.key;

  //check to see if userKey is a letter


  if (letters.includes(userKey) && gameState === true) {
    messageHTML.textContent = "Can you guess the hidden word?"
    //check to see if usey key is located in 
    if (wordArr.includes(userKey) && !wrongGuesses.includes(userKey)) {
      wordReveal(wordArr, wordHidden, userKey);
      wrongGuesses.push(userKey);
      if (!wordHidden.includes("_")) {
        messageHTML.textContent = "Congratulations, you won! Press Enter to play again.";
        wins++;
        gameState = false;
      } else if (lives === 0) {
        messageHTML.textContent = "You lost. Press Enter to play again.";
        losses++;
        gameState = false;
      }
    } else if (wrongGuesses.includes(userKey)) {
      messageHTML.textContent = "You've tried that letter before... Try again.";
    } else if (!wordArr.includes(userKey)) {
      wrongGuesses.push(userKey);
      lives--;
      if (lives === 0) {
        messageHTML.textContent = "You lost. Press Enter to play again.";
        losses++;
        gameState = false;
      }
    }
  } else if (userKey === "Enter" & gameState === false) {
    resetGame();
    console.log(wordArr, wordHidden);
  } else {
    messageHTML.textContent = "That's not a letter. Sorry, try again.";
      if (gameState === false) {
        messageHTML.textContent = "Press the Enter key to play again.";
      }
  }

  wordHTML.textContent = wordHidden.join(" ");
  winsHTML.textContent = wins;
  lossesHTML.textContent = losses;
  livesHTML.textContent = lives;
  guessesHTML.textContent = wrongGuesses.join(" ");

  if (gameState === false) {
    wordHTML.textContent = wordArr.join(" ");
  }
  console.log(wordHidden);
}