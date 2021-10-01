const playerLives = 6;

class Player {
  constructor(livesCounter, scoreCounter, highScoreCounter) {
    this.lives = playerLives;
    this.score = 0;
    this.livesCounter = livesCounter;
    this.scoreCounter = scoreCounter;
    this.highScoreCounter = highScoreCounter;
    this.highScore = localStorage.getItem("highScore") || 0;
    this.updateHighScoreCounter();
    this.updateLivesCounter();
    this.updateScoreCounter();
  }
  reduceLives() {
    this.lives--;
    this.updateLivesCounter();
    return;
  }
  hasNoMoreLives() {
    return this.lives <= 0;
  }
  incrementScore() {
    this.score++;
    this.updateScoreCounter();
  }
  setHighScore() {
    localStorage.setItem("highScore", this.score);
  }
  reset() {
    this.endGame();
    this.lives = playerLives;
    this.score = 0;
    this.updateLivesCounter();
    this.updateScoreCounter();
  }
  endGame() {
    this.highScore = this.score > this.highScore ? this.score : this.highScore;
    localStorage.setItem("highScore", this.highScore);
    this.updateHighScoreCounter();
  }
  updateLivesCounter() {
    this.livesCounter.textContent = this.lives > 0 ? this.lives : 0;
  }
  updateScoreCounter() {
    this.scoreCounter.textContent = this.score;
  }
  updateHighScoreCounter() {
    this.highScoreCounter.textContent = this.highScore;
  }
}
