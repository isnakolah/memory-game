// Grab a couple of things
const section = document.querySelector("section");
const livesCounter = document.querySelector(".playerLives");
const scoreCounter = document.querySelector(".playerScore");
const highScoreCounter = document.querySelector(".playerHighScore");
const peekButton = document.querySelector("#peek");
const endGameButton = document.querySelector("#endGame");
const restartGameButton = document.querySelector("#restartGame");

const player = new Player(livesCounter, scoreCounter, highScoreCounter);

// Starting the game
const startGame = () => {
  peekButton.addEventListener("click", peekCards);
  endGameButton.addEventListener("click", endGame);
  restartGameButton.addEventListener("click", restartGame);
  togglePeekButton();
  cardGenerator();
};

// Wrapper function to handle disable/enable clicking
const toggleClicking = (func, timeout) => {
  section.style.pointerEvents = "none";
  func();
  setTimeout(() => (section.style.pointerEvents = "all"), timeout || 1000);
};

// Card generator function
const cardGenerator = () => {
  const data = randomizedData();

  // Generate the html
  data.forEach((item) => {
    const card = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("div");

    // Add classes
    card.classList.add("card");
    front.classList.add("front");
    back.classList.add("back");

    // Attach attributes to the cards
    front.src = item.imgSrc;
    card.setAttribute("name", item.name);

    // Attach card to section
    section.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    // On click toggle card
    card.addEventListener("click", () => {
      card.classList.toggle("flipCard");
      checkCards();
    });
  });
};

// Check cards
const checkCards = () => {
  const flippedCards = document.querySelectorAll(".flipCard");

  if (flippedCards.length === 2) {
    toggleClicking(() => {
      if (cardsMatch(flippedCards)) {
        // Substitute the flipCard class with cardMatched class
        flippedCards.forEach((card) => {
          card.classList.remove("flipCard");
          card.classList.add("cardMatched");
          card.style.pointerEvents = "none";
        });
        player.incrementScore();
        checkIfPlayerHasWon();
      } else {
        // Unflip the cards after a second
        flippedCards.forEach((card) => {
          setTimeout(() => card.classList.remove("flipCard"), 1000);
        });
        // Animate decrement of lives
        setTimeout(() => player.reduceLives(), 500);
        checkIfPlayerHasLost();
      }
    });
  }
  clearTimeout();
};

const checkIfPlayerHasWon = () => {
  if (document.querySelectorAll(".cardMatched").length === getData().length) {
    setTimeout(() => {
      alert("You won!");
      restartGame();
    }, 1000);
  }
};

const checkIfPlayerHasLost = () => {
  setTimeout(
    () => player.lives < 4 && livesCounter.classList.add("lowLives"),
    1000
  );
  if (player.hasNoMoreLives()) {
    setTimeout(() => {
      restartGame();
    }, 1000);
  }
};

const cardsMatch = (flippedCards) => {
  const firstCardName = flippedCards[0].getAttribute("name");
  const secondCardName = flippedCards[1].getAttribute("name");

  return firstCardName === secondCardName;
};

const endGame = () => {
  if (
    confirm(
      "Are you sure you want to end the game?\nAll progress will be lost."
    )
  ) {
    restartGame();
    return;
  }
  return;
};

// restart game
const restartGame = () => {
  const data = randomizedData();
  const cards = document.querySelectorAll(".card");

  livesCounter.classList.remove("lowLives");

  toggleClicking(() => {
    // randomize the data in the rendered cards
    cards.forEach((card, index) => {
      card.classList = "card";

      setTimeout(() => {
        card.style.pointerEvents = "all";
        card.firstChild.src = data[index].imgSrc;
        card.setAttribute("name", data[index].name);
      }, 1000);
    });
  });

  // reset player
  player.reset();

  // Set button to peek
  togglePeekButton();
  toggleEndGameButton();
};

const peekCards = () => {
  toggleClicking(() => {
    const cards = document.querySelectorAll(".card");
    // Add a peek class to each card for 2 secs
    cards.forEach((card) => {
      card.classList.add("peek");
      setTimeout(() => card.classList.remove("peek"), 2000);
    });
    togglePeekButton();
    toggleEndGameButton();
  }, 2000);
};

const toggleEndGameButton = () => toggleButtonView(endGameButton);

const togglePeekButton = () => toggleButtonView(peekButton);

const toggleRestartButton = () => toggleButtonView(restartGameButton);

const toggleButtonView = (buttonToToggle) => {
  if (buttonToToggle.style.display === "none") {
    buttonToToggle.style.display = "block";
    return;
  }
  buttonToToggle.style.display = "none";
};

startGame();
