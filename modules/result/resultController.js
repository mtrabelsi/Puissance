angular
    .module('game.result', [])
    .controller('ResultController', resultController);

function resultController(MatchService,$scope, $state, $rootScope) {
    $scope.rounds = MatchService.getRounds();//get all rounds

    $scope.player1 = MatchService.getPlayerById(1);
    $scope.player2 = MatchService.getPlayerById(2);
    $scope.winner = $scope.player1.getNumberOfWins() > $scope.player2.getNumberOfWins() ? $scope.player1:$scope.player2; 

    $scope.reStartMatch = function(){
    //	$rootScope.gameData = {gameData: {player1Name: player1.getName(), player2Name: player2.getName(), nbrRounds: MatchService.getRounds().length}}; 
    	$state.go('startup');
    };
}
