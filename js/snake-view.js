(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var View = Game.View = function (element) {
    this.$el = element;
    this.$gameEl = this.$el.find(".snake");
    this.$scoreEl = this.$el.find(".score");
    this.board = new Game.Board(18);
    this.setupBoard();
    this.inPlay = false;
    $(window).keydown(this.keyHandler.bind(this));
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
      this.board.snake.turn(View.COMMANDS[key]);
    } else if (key === 80) {
      window.location.reload();
    } else if ((key === 32) && (!this.inPlay)) {
      this.snakeInterval = window.setInterval(this.step.bind(this), 150);
      this.inPlay = true;
    } else if ((key === 32) && (this.inPlay)) {
      window.clearInterval(this.snakeInterval);
      this.inPlay = false;
    }
  };

  View.prototype.render = function () {
    this.changeClasses(this.board.snake.segments, "snake-element");
    this.changeClasses(this.board.apple, "apple");
    this.$scoreEl.html("<p>"+ this.board.score.toString() + "</p>");
  };

  View.prototype.step = function () {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      document.getElementById('gameover').play();
      this.$end = $("body").find(".end-of-game");
      var scoreText = "<p>Your score is: " + this.board.score.toString() + "</p>";
      this.$end.find(".end-score").html(scoreText);
      this.$end.addClass("visible");
      $("body").addClass("grey");
      window.clearInterval(this.snakeInterval);
    }
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

    this.$gameEl.html(htmlBoard);
    this.$li = this.$gameEl.find("li");
  };

  View.prototype.changeClasses = function (coords, className) {
    this.$li.filter("." + className).removeClass();

    //For all of the coords, find the appropriate list item and change
    //its class to snake.
    _.each(coords, function (coord) {
      var listNumber = coord.y * this.board.size + coord.x;
      this.$li.eq(listNumber).addClass(className);
    }.bind(this));
  };
})();
