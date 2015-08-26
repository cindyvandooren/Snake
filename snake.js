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
  };

  Snake.DIRS = {
    "N": new Coord(0, -1),
    "S": new Coord(0, 1),
    "E": new Coord(1, 0),
    "W": new Coord(-1, 0)
  };

  Snake.prototype.move = function () {
    this.segments = _.map(this.segments, function (segment) {
      return segment.plus(Snake.DIRS[this.dir]);
    }.bind(this));

    return this.segments;
  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
    //Should also check if the new direction is opposite of the old one.
    //This to avoid the snake to be hitting itself when going the opposite way.
  };

  Snake.GROWTH_RATE = 3;

  Snake.prototype.grow = function () {
    //Make the snake grow when it eats an apple
  };

  var Board = Game.Board = function (size) {
    this.size = size;
    this.snake = new Snake(this);
    this.apple = [this.newApple()];
  };

  Board.prototype.newApple = function () {
    var appleX = Math.floor((Math.random() * (this.size + 1)));
    var appleY = Math.floor((Math.random() * (this.size + 1)));
    return new Coord(appleX, appleY);
  };
})();
