(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var View = Game.View = function (element) {
    this.$el = element;
    this.board = new Game.Board(18);
    this.setupBoard();

    $(window).keydown(this.keyHandler.bind(this));

    this.snakeInterval = window.setInterval(this.step.bind(this),150);
  };

  View.COMMANDS = {
    37: "W",
    38: "N",
    39: "E",
    40: "S"
  };

  View.prototype.keyHandler = function (event) {
    var key = event.keyCode;

    if (key in View.COMMANDS) {
      this.board.snake.dir = View.COMMANDS[key];
    }
  };

  View.prototype.render = function () {
    this.changeClasses(this.board.snake.segments, "snake-element");
    this.changeClasses(this.board.apple, "apple");
  };

  View.prototype.step = function () {
    this.render();
    this.board.snake.move();
  };

  View.prototype.setupBoard = function () {
    var htmlBoard = "";

    for (var y = 0; y < this.board.size; y++) {
      htmlBoard += "<ul>";
      for (var x = 0; x < this.board.size; x++) {
        htmlBoard += "<li></li>";
      }
      htmlBoard += "</ul>";
    }

    this.$el.html(htmlBoard);
    this.$li = this.$el.find("li");
  };

  View.prototype.changeClasses = function (coords, className) {
    this.$li.filter("." + className).removeClass();

    //For all of the coords, find the appropriate list item and change
    //its class to snake.
    _.each(coords, function (coord) {
      var listNumber = coord.y * this.board.size + coord.x;
      console.log(listNumber);
      this.$li.eq(listNumber).addClass(className);
    }.bind(this));
  };
})();
