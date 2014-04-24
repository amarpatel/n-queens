var Tree = function () {
  this.children = [];
};

var TreeNode = function (board) {
  this.board = board;
  this.children = [];
  this.parent = null;
  this.pieces = 0;
};
