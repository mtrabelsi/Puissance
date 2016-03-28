angular
    .module('game.startup', ['ui.router', 'game.match.player', ])
    .controller('StartupController', startupController);

function startupController($scope, $state, PlayerFactory, MatchService, $rootScope) {
    $scope.match = {
        playerName1: '',
        playerName2: '',
        numberOfRounds: 0
    };

    if (MatchService.getPlayers().length > 0) {
        $scope.match.playerName1 = MatchService.getPlayerById(1).getName();
        $scope.match.playerName2 = MatchService.getPlayerById(2).getName();
        $scope.match.numberOfRounds = MatchService.getRounds().length;
    }

    $scope.startMatch = function(playerN1, playerN2, nbrOfRounds) {
        if (nbrOfRounds <= 0 || nbrOfRounds == null || playerN1 == null || playerN2 == null || playerN1 == playerN2) {
            alert('Please check your input');
            return;
        }

        var player1 = PlayerFactory.getInstance(1, playerN1);
        var player2 = PlayerFactory.getInstance(2, playerN2);
        MatchService.init(nbrOfRounds, player1, player2);

        $state.go('match');
    }



}
