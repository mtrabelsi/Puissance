angular
    .module('game.match', ['game.match.round'])
    .controller('MatchController', matchController);

function matchController(MatchService, $scope, GRID_SIZE, COLOR_MAP, GridService, $state, $interval, PlayerFactory) {
    $scope.rounds = MatchService.getRounds();//get all rounds
    $scope.player1 = MatchService.getPlayerById(1);
    $scope.player2 = MatchService.getPlayerById(2);

    $scope.grid = {
        cols: GRID_SIZE.cols,
        rows: GRID_SIZE.rows
    };
    //init the grid
    GridService.init(GRID_SIZE.rows, GRID_SIZE.cols);

  	var increaseTime = function () {
  	   //we bind one timer for both player (depending on the current player)
       $scope.currentPlayer.addReflexTime();
    }
    //set an interval of 1000ms = 1s
	var interval = $interval(increaseTime, 1000);

    //info to display
    $scope.roundCounter = MatchService.getRoundCounter();
    $scope.numberOfHits = MatchService.getCurrentRound().getNumberOfHits();
    $scope.currentPlayerId = MatchService.getRandomPlayerId(1, 2);
    $scope.currentPlayer = MatchService.getPlayerById($scope.currentPlayerId);

    //inser disc opt
    $scope.insertDisc = function(c) {
        var returnVal = GridService.getAvailableCell(c);
        var currentRound = MatchService.getCurrentRound();
        currentRound.increaseNumberOfHits($scope.currentPlayer.getName());
        $scope.currentPlayer.increaseNumberOfTotalHits();

        if (returnVal.found) {//if there is an available cell
            GridService.insertDisc(returnVal.row, returnVal.col, $scope.currentPlayerId);
            var tmp = GridService.getGrid();
            if (GridService.isVictory(tmp, returnVal.row, returnVal.col, $scope.currentPlayerId)) {
                var winPlayer = $scope.player1.getId() == $scope.currentPlayerId ? $scope.player1 : $scope.player2;
                currentRound.setWinner(winPlayer);
                if(winPlayer!=null)
                alert(winPlayer.getName() + " gagne!, partie suivante?");

                //if we reached the maximum number of rounds => match is finished
                if (MatchService.increaseRoundCounter().matchFinished) {
                	//stop Timer
					$interval.cancel(interval);
					//w go to the result state
                    $state.go('result');
                } else{//we re still playing tha match
                	GridService.resetGrid(GRID_SIZE.rows, GRID_SIZE.cols);
    				$scope.roundCounter = MatchService.getRoundCounter();

                	alert('nouvelle partie est commencé');
                }

            }

            $scope.swapPlayer();//next player turn
        } else {
            alert('la colone est pleine!');
        }
    }
    //turns swapping 
    $scope.swapPlayer = function() {
        $scope.currentPlayerId = $scope.currentPlayerId == 2 ? 1 : 2;
        $scope.currentPlayer = MatchService.getPlayerById($scope.currentPlayerId);
    }
    // managing css classes activation
    $scope.isCellColor = function(row, col, color) {
        var playerId = GridService.getGrid()[row][col];
        if (playerId == 0) {
            return color == 'empty' ? true : false;
        }
        return color == COLOR_MAP[playerId];
    }

    $scope.isCurrentColor = function(color) {
        return color == COLOR_MAP[$scope.currentPlayerId]
    }
    //used in the ng-repeat to generate fake objects
    $scope.getNumber = function(num) {
        return new Array(num);
    }

}
