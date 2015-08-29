(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Coord = Game.Coord = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.plus = function (otherCoord) {
    var newX = this.x + otherCoord.x;
    var newY = this.y + otherCoord.y;
    return new Coord(newX, newY);
  };

  Coord.prototype.equals = function (otherCoord) {
    var equalX = this.x === otherCoord.x;
    var equalY = this.y === otherCoord.y;
    return equalX && equalY;
  };

  Coord.prototype.isOpposite = function (otherCoord) {
    var oppositeX = this.x === -1 * otherCoord.x;
    var oppositeY = this.y === -1 * otherCoord.y;
    return oppositeX && oppositeY;
  };

  var Snake = Game.Snake = function (board) {
    this.board = board;
    this.dir = "S";
    var middle = Math.floor(board.size / 2); //Assumes a square board.
    var start = new Coord(middle, 0); //Snake starts in center of top row.
    this.segments = [start]; //Array of board coordinates
    this.turning = false;
    this.growth = 0;
  };

  Snake.DIRS = {
    "N": new Coord(0, -1),
    "S": new Coord(0, 1),
    "E": new Coord(1, 0),
    "W": new Coord(-1, 0)
  };


  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.eatApple = function () {
    if (this.head().equals(this.board.apple[0])) {
      this.growth += 3;
      document.getElementById('eatapple').play();
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.move = function () {
    this.segments.push(this.head().plus(Snake.DIRS[this.dir]));

    this.turning = false;

    if (this.eatApple()) {
      this.board.apple = [this.board.newApple()];
    }

    if (this.growth > 0) {
      this.growth -= 1;
    } else {
      this.segments.shift();
    }

    if (!this.isValid()) {
      this.segments = [];
    }
  };

  Snake.prototype.isValid = function () {
    var head = this.head();

    if (!this.board.validPosition(this.head())) {
      return false;
    }

    //Position is invalid if snake hits itself
    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  };

  Snake.prototype.isOccupying = function (position) {
    var occupying = false;
    _.each(this.segments, function (segment) {
      if (segment.x === position[0] && segment.y === position[1]){
        occupying = true;
        return occupying;
      }
    });
    return occupying;
  };

  Snake.prototype.turn = function (dir) {
    if (Snake.DIRS[this.dir].isOpposite(Snake.DIRS[dir]) ||
      this.turning) {
      return;
    } else {
      this.turning = true;
      this.dir = dir;
    }
  };

  var Board = Game.Board = function (size) {
    this.size = size;
    this.snake = new Snake(this);
    this.apple = [this.newApple()];
    this.score = 0;
  };

  Board.prototype.newApple = function () {
    var appleX = Math.floor((Math.random() * this.size));
    var appleY = Math.floor((Math.random() * this.size));

    while (this.snake.isOccupying([appleX, appleY])) {
      appleX = Math.floor(Math.random() * this.size);
      appleY = Math.floor(Math.random() * this.size);
    }

    this.score += 10;
    return new Coord(appleX, appleY);
  };

  Board.prototype.validPosition = function (coord) {
    if ((coord.x >= 0) && (coord.x < this.size)) {
      if((coord.y >= 0) && (coord.y < this.size)) {
        return true;
      }
    }
    return false;
  };
})();
