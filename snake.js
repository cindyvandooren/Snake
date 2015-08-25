(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Snake = Game.Snake = function (board) {
    this.dir = "N";
    this.board = board;
    //Assumes a square board.
    var middle = Math.floor(board.dim / 2);
    var center = new Coord(middle, middle);
    //The segments will be an array of grid coordinates.
    this.segments = [center];
  };

  Snake.DIRS = {
    "N": (0, -1),
    "S": (0, 1),
    "E": (1, 0),
    "W": (-1, 0)
  };

  var Board = Game.Board = function () {

  };

  Snake.prototype.move = function () {
    //for every coordinate in this.segments, make a new coordinate of the direction and add it to the segments coordinate.
  };
})();
