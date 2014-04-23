/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function () {};

//returns an array of valid boards with one additional piece
window.addOnePiece = function(board) {
  var results = [];
  var matrix = board.attributes;
  var n = matrix.n;
  var i, j;

  var boardSlice = function (board) {
    var temp = [];
    for (var i=0; i<n; i++) {
      temp.push(board.attributes[i]);
    }
    return new Board(temp);
  };

  //i === rows
  //j === columns
  for (i=0;i<n;i++) {
    for (j=0;j<n;j++) {
      if (matrix[i][j] === 1) {
        continue;
      } else {
        matrix[i][j] = 1;
        if (!board.hasRowConflictAt(i) && !board.hasColConflictAt(j)) {
          results.push(boardSlice(board));
        }
        matrix[i][j] = 0;
      }
    }
  }

  return results;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
