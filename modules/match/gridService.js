angular
    .module('game.match')
    .factory('GridService', gridService);

//matchFactory.$inject = [];

function gridService(RoundFactory) {
  var grid = null;

  var resetGrid = function(rows, cols) {
    for(var l=0;l<rows;l++){
      for (var c = 0; c <cols; c++) {
        grid[l][c] = 0;
      }
    }
  };

  var init = function (rows, cols) {
    grid = new Array(rows);
    for (var i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }
    resetGrid(rows, cols);
  };

  var getGrid = function () {
    return grid;
  };

  var isVictory = function(myGrid, lastRow, lastCol, playerId) {
    var vOccurence = 0;
    for (var i = 0; i <myGrid.length;i++){
      var cell = myGrid[i][lastCol];
      if(playerId==cell){
          vOccurence++;
        } else{
          vOccurence =0;
        }
        if(vOccurence>=4) return true;
      }

     var hOccurence = 0;
    for (var i = 0; i <myGrid[0].length;i++){
      var cell = myGrid[lastRow][i];
      if(playerId==cell){
          hOccurence++;
        } else{
          hOccurence=0;
        }
        if(hOccurence>=4) return true;
      }

  return false;
}

  var getAvailableCell = function(c){
    var rows = grid.length;

    for (var rowIndex = rows - 1; rowIndex >= 0; rowIndex--) {
        if (grid[rowIndex][c]== 0) {
         return {found:true, col: c, row: rowIndex};
        }
    }

  return {found:false};
  };

  var insertDisc= function (row, col, playerId) {
    grid[row][col] = playerId;
  };
/*  var finishMatch = function (reflexTime) {
    var numberOfPlayedRounds=0;
    var numberOfWonRounds=0;
    var reflexTime=0;
  };*/

  return {
    init: init,
    getGrid: getGrid,
    insertDisc: insertDisc,
    getAvailableCell: getAvailableCell,
    isVictory: isVictory,
    resetGrid: resetGrid
  };
}
