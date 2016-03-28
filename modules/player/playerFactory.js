angular
    .module('game.match.player')
    .factory('PlayerFactory', playerFactory);

function playerFactory(MatchService) {

  var Player = function (id, name) {
    this.id = id;
    this.name = name;
    this.reflexTime = 0;
    this.numberOfTotalHits = 0;
   // this.numberOfPlayedRounds = 0;
  };

  Player.prototype.getNumberOfWins = function(){
    var nbrWins = 0;
    var rounds = MatchService.getRounds();
    //MatchService.getRounds().forEach(function(round){
      for(var i = 0; i< rounds.length; i++){
        if(rounds[i].isWinner(this)){
          nbrWins++;
        }  
      }
      
    //});
    return nbrWins;
  };

  Player.prototype.getName  = function () {
    return this.name;
  };

  Player.prototype.getId  = function () {
    return this.id;
  };
  
  Player.prototype.getreflexTime = function () {
    return this.reflexTime;
  }; 

  Player.prototype.addReflexTime = function () {
    this.reflexTime++;
  };
  Player.prototype.increaseNumberOfTotalHits = function (reflexTime) {
    this.numberOfTotalHits++;
  };

  Player.prototype.getNumberOfTotalHits = function (reflexTime) {
    return this.numberOfTotalHits;
  };

  Player.prototype.ResetPlayer = function (reflexTime) {
  //  this.numberOfPlayedRounds=0;
    this.reflexTime=0;
  };

  return {
    getInstance: function (id, name) {
      return new Player(id, name);
    }
  };

}
