angular
    .module('game.match')
    .factory('MatchService', matchService);

//matchFactory.$inject = [];

function matchService(RoundFactory) {
  var rounds = [];
  var players = [];
  var roundCounter = 0;
  
  var init = function (numberOfRounds, p1, p2) {
    rounds = [];
    players = [];
    roundCounter = 0;

    players.push(p1);
    players.push(p2);
    for(var i=0;i<numberOfRounds;i++){
       rounds.push(RoundFactory.getInstance(i, p1.getName(), p2.getName()));
    }
  };

  var getRounds = function () {
    return rounds;
  };
  
  var increaseRoundCounter = function(){
    roundCounter++;
    return roundCounter>rounds.length-1? {matchFinished: true} : {matchFinished: false};
  };

  var getCurrentRound = function(){
    return rounds[roundCounter];
  };

  var getRoundCounter = function(){
    return roundCounter;
  };
  var getPlayerById = function (id) {
    return players[0].id==id ? players[0] : players[1];
  };

  var getPlayers = function () {
    return players;
  };



  var getRandomPlayerId = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  };



/*  var finishMatch = function (reflexTime) {
    var numberOfPlayedRounds=0;
    var numberOfWonRounds=0;
    var reflexTime=0;
  };*/

  return {
    init: init,
    getRounds: getRounds,
    getPlayerById: getPlayerById,
    getPlayers: getPlayers,
    getRandomPlayerId: getRandomPlayerId,
    increaseRoundCounter:increaseRoundCounter,
    getRoundCounter: getRoundCounter,
    getCurrentRound: getCurrentRound
  };
}
