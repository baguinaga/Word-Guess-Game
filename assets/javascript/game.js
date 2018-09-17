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
console.log(wordArr);

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
//random word function, used to store temp random word to wordArr
function wordRandom() {
  return wordList[Math.floor(Math.random() * wordList.length)].split("");
}

//function used to convert temp random word into hidden word and reveal guessed characters
function wordHidden(arr, str) {
  var wordDash = "_".repeat(arr.length).split("");

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === str) {
      wordDash[i] = arr[i];
    }
  }
  return wordDash;
}

//setting initial HTML/js values
function resetGame() {
  wordArr = wordRandom();
  wordHTML.textContent = wordHidden(wordArr, "").join(" ");
  lives = 10;
  livesHTML.textContent = lives;
  wrongGuesses = [];
  guessesHTML.textContent = wrongGuesses.join("");
  messageHTML.textContent = "Can you guess the hidden word?";
}

resetGame();

//testing console.log
console.log(wordHidden(wordArr, "a"), wordArr);

//event function, testing for matching letter and runnign game logic
document.onkeyup = function (e) {
  var userKey = e.key;
  if (letters.includes(userKey)) {
    if (wordArr.includes(userKey) && wordHidden(wordArr, userKey).includes("_")) {
      wordArrTemp = wordHidden(wordArr, userKey);
      wordHTML.textContent = wordHidden(wordArrTemp, userKey);
    } 
  } else {
    messageHTML.textContent = "That's not a letter. Try again.";
  }
}

/* did the user input a correct character?
yes = run game logic no = try again message
is the game still ongoing?
  yes -> run game logic
  no ->  
*/