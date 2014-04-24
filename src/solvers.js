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
window.addOnePieceRooks = function(board) {
  var results = [];
  var matrix = board.attributes;
  var n = matrix.n;
  var i, j;

  var boardSlice = function (board) {
    var temp = [];
    for (var i=0; i<n; i++) {
      temp.push(board.attributes[i].slice());
    }
    var newBoard = new Board(temp);
    return newBoard;
  };

  //i === rows
  for (i=0;i<n;i++) {
    //j === columns
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
  var tree = new Tree();
  var boards = addOnePieceRooks(new Board({n:n}));
  for(var i = 0; i < boards.length; i++){
    var treeNode = new TreeNode(boards[i]);
    treeNode.parent = tree;
    treeNode.pieces++;
    tree.children.push(treeNode);
  }



  var boardsToNodes = function (boards, node) {
    var results = [];
    for (var i=0;i<boards.length;i++) {
      var newNode = new TreeNode(boards[i]);
      newNode.parent = node;
      newNode.pieces = node.pieces + 1;
      results.push(newNode);
    }
    return results;
  };





  //contains all valid boards with n pieces
  var results = [];
  var recurse = function (node) {
    for (var i=0;i<node.children.length;i++) {
      if (node.children[i].pieces === n) {
        results.push(node.children[i].board);
      } else {
        node.children[i].children = boardsToNodes(addOnePieceRooks(node.children[i].board), node.children[i]);
        recurse(node.children[i]);
      }
    }
  };
  recurse(tree);

  var removeDuplicates = {};
  for(var i = 0; i < results.length; i++){
    removeDuplicates[JSON.stringify(results[i])] = true;
  }
  return Object.keys(removeDuplicates).length;





};

//OLD
// window.addOnePieceQueens = function(board) {
//   var results = [];
//   var matrix = board.attributes;
//   var n = matrix.n;
//   var i, j;

//   var boardSlice = function (board) {
//     var temp = [];
//     for (var i=0; i<n; i++) {
//       temp.push(board.attributes[i].slice());
//     }
//     var newBoard = new Board(temp);
//     return newBoard;
//   };

//   //i === rows
//   for (i=0;i<n;i++) {
//     //j === columns
//     for (j=0;j<n;j++) {
//       if (matrix[i][j] === 1) {
//         continue;
//       } else {
//         matrix[i][j] = 1;
//         if (!board.hasRowConflictAt(i) && !board.hasColConflictAt(j) && !board.hasAnyMinorDiagonalConflicts() && !board.hasAnyMajorDiagonalConflicts()) {
//           results.push(boardSlice(board));
//         }
//         matrix[i][j] = 0;
//       }
//     }
//   }

//   return results;
// };

//NEW - RIPPLE
window.addOnePieceQueens = function(board) {
  var results = [];
  var matrix = board.attributes;
  var n = matrix.n;
  var i, j;

  var ripple = function (matrix, x, y) {
    var x2 = x;
    var y2 = y;
    var n = matrix.length;

    //up
    while (y2 >= 0) {
      matrix[y2][x2] = 1;
      y2--;
    }
    y2 = y;
    //down
    while (y2 < n) {
      matrix[y2][x2] = 1;
      y2++;
    }
    y2 = y;
    //left
    while (x2 >= 0) {
      matrix[y2][x2] = 1;
      x2--;
    }
    x2 = x;
    //right
    while (x2 < n) {
      matrix[y2][x2] = 1;
      x2++;
    }
    x2 = x;
    //NW
    while (x2 >= 0 && y2 >= 0) {
      matrix[y2][x2] = 1;
      x2--;
      y2--;
    }
    x2 = x;
    y2 = y;
    //NE
    while (x2 < n && y2 >= 0) {
      matrix[y2][x2] = 1;
      x2++;
      y2--;
    }
    x2 = x;
    y2 = y;
    //SW
    while (x2 >= 0 && y2 < n) {
      matrix[y2][x2] = 1;
      x2--;
      y2++;
    }
    x2 = x;
    y2 = y;
    //SE
    while (x2 < n && y2 < n) {
      matrix[y2][x2] = 1;
      x2++;
      y2++;
    }
    matrix[y][x] = 2;

    return matrix;
  };

  var boardSlice = function (board,x,y) {
    var temp = [];
    for (var i=0; i<n; i++) {
      temp.push(board.attributes[i].slice());
    }
    temp = ripple(temp, x, y);
    var newBoard = new Board(temp);
    return newBoard;
  };

  //i === rows
  for (i=0;i<n;i++) {
    //j === columns
    for (j=0;j<n;j++) {
      if (matrix[i][j] === 1 || matrix[i][j] === 2) {
        continue;
      } else {
        results.push(boardSlice(board,j,i));
        matrix[i][j] = 0;
      }
    }
  }

  return results;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
 var tree = new Tree();
  var boards = addOnePieceQueens(new Board({n:n}));
  for(var i = 0; i < boards.length; i++){
    var treeNode = new TreeNode(boards[i]);
    treeNode.parent = tree;
    treeNode.pieces++;
    tree.children.push(treeNode);
  }



  var boardsToNodes = function (boards, node) {
    var results = [];
    for (var i=0;i<boards.length;i++) {
      var newNode = new TreeNode(boards[i]);
      newNode.parent = node;
      newNode.pieces = node.pieces + 1;
      results.push(newNode);
    }
    return results;
  };





  //contains all valid boards with n pieces
  var results = [];
  var recurse = function (node) {
    for (var i=0;i<node.children.length;i++) {
      if (node.children[i].pieces === n) {
        results.push(node.children[i].board);
      } else {
        node.children[i].children = boardsToNodes(addOnePieceQueens(node.children[i].board), node.children[i]);
        recurse(node.children[i]);
      }
    }
  };
  recurse(tree);

  var removeDuplicates = {};
  for(var i = 0; i < results.length; i++){
    removeDuplicates[JSON.stringify(results[i])] = true;
  }
  return Object.keys(removeDuplicates).length;





};
