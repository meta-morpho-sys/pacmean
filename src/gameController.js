function GameController() {
  this.pacMeanX = 9 * GRID_ELEMENT_WIDTH;    //starts at grid position j = 9
  this.pacMeanY = 16 * GRID_ELEMENT_HEIGHT;  //starts at grid position i = 16
  this.pacDotScore = 50;
  this.world = new World();
  this.pacMean = new PacMean(this.pacMeanX, this.pacMeanY);
  this.score = new Score();
  this.pinky = new Ghost();
  this.endstate = new Endstate();
}

GameController.prototype.setKey = function (key) {
  this.pacMean.setKey(key);
};

GameController.prototype.updateGameArea = function () {
  this.clear();
  if (!this.pacMean.getKey()) return;
  if (this.world.isPacDot(this.pacMean.xCoordinate(), this.pacMean.yCoordinate())) {
    this.world.gridToZero(this.pacMean.xCoordinate(), this.pacMean.yCoordinate());
    this.score.increase(this.pacDotScore);
    wacka.play();
  }
  this.pacMeanMovement();
  this.ghostMovement();
};

GameController.prototype.clear = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle='black';
  context.fillRect(0,0,canvas.width,canvas.height);
  this.world.draw();
  if (this.endGameIfOver()) return;
  this.pacMean.draw();
  this.pinky.draw();
  this.score.draw(GRID_ELEMENT_WIDTH,GRID_ELEMENT_HEIGHT);
};

GameController.prototype.returnDirection = function () {
  if (this.pacMean.getKey() === 37) {return this.pacMean.goLeft();}
  if (this.pacMean.getKey() === 38) {return this.pacMean.goUp();}
  if (this.pacMean.getKey() === 39) {return this.pacMean.goRight();}
  if (this.pacMean.getKey() === 40) {return this.pacMean.goDown();}
};

GameController.prototype.endGameIfOver = function () {
  if (this.world.haveAllPacDotsBeenEaten()) {
    this.endstate.draw(GRID_ELEMENT_WIDTH, GRID_ELEMENT_HEIGHT, "GAME OVER", "No more dots! Now what?!");
    return true;
  } else if (this.ghostEatsPacMean()) {
    this.endstate.draw(GRID_ELEMENT_WIDTH, GRID_ELEMENT_HEIGHT, "GAME OVER", "Pinky got you! Booooooo!");
    return true;
  }
  return false;
};

GameController.prototype.ghostEatsPacMean = function () {
  return this.pacMean.xCoordinate() === this.pinky.xCoordinate() && this.pacMean.yCoordinate() === this.pinky.yCoordinate();
};

GameController.prototype.pacMeanMovement = function () {
  if (this.world.isWall(this.pacMean.xCoordinate(), this.pacMean.yCoordinate(), this.pacMean.getKey())) return;
  this.returnDirection();
};

GameController.prototype.ghostMovement = function () {
  this.pinky.look(this.pacMean.xCoordinate(), this.pacMean.yCoordinate());
  this.pinky.chooseDirection();
  if (this.world.isWall(this.pinky.xCoordinate(), this.pinky.yCoordinate(), this.pinky.getDirection())) return;
  this.pinky.follow();

};
