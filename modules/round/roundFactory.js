angular
    .module('game.match.round')
    .factory('RoundFactory', roundFactory);

function roundFactory() {

  var Round = function (id, player1Name, player2Name) {
    this.id = id;
    this.winner = null;//not yet decided
    this.numberOfHits = {
      of: {}
    };
    this.numberOfHits.of[player1Name] = 0;
    this.numberOfHits.of[player2Name] = 0;
  };

  Round.prototype.increaseNumberOfHits  = function (playerName) {
    this.numberOfHits.of[playerName]++;
  };

  Round.prototype.getNumberOfHits  = function () {
    return this.numberOfHits;
  };

  Round.prototype.setWinner  = function (player) {
    this.winner = player;
  };

  Round.prototype.isWinner  = function (player) {
    if(this.winner==null){
      return false;
    }
    return this.winner.id == player.id;
  };

  Round.prototype.getWinner  = function () {
    return this.winner;
  };

  return {
    getInstance: function (id, name1, name2) {
      return new Round(id, name1, name2);
    }
  };

}
