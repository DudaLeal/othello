function IA(currentPlayer) {
    this.currentPlayer = currentPlayer;
    this.maxDepth = 5;
}
  
IA.prototype.move = function(board) {
    this.visits = 0;
    var res = this.minimax(board, 0, this.currentPlayer, this.maxDepth, -100000, 100000);
    console.log("Total nodes: " + this.visits);
    return res;
}

IA.prototype.minimax = function(board, depth, currentPlayer, maxDepth, alpha, beta) {
    this.visits++;
    var newBoard, score, move;
    var bestMove;
    var moves = board.getAllValidMoves(currentPlayer);

    if(depth >= maxDepth || moves.length === 0){
        var he = this.mobility(board, currentPlayer);
        return he;
    }
    if(currentPlayer === this.currentPlayer){
        // Maximize
        for (var i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            newBoard = board.copy();
            this.doMove(newBoard, move, currentPlayer);
            score = this.minimax(newBoard, (depth + 1), (currentPlayer ? 0 : 1), maxDepth, alpha, beta);
            move.score = score;
            if(score > alpha){
                alpha = score;
                bestMove = move;
                
            }
            if(beta <= alpha){
                break;
            }
        }
        if(depth === 0){
            return bestMove;
        } else {
            return alpha;
        }
    } else {
        // Minimize
        var min = 100000;
        for (var i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            newBoard = board.copy();
            this.doMove(newBoard, move, currentPlayer);
            score = this.minimax(newBoard, (depth + 1), (currentPlayer ? 0 : 1), maxDepth, alpha, beta);
            if(score < beta){
                beta = score;
            }
            if(beta <= alpha){
                break;
            }
        }
        return beta;
    }
}

IA.prototype.doMove = function(board, move, currentPlayer) {
    board.flip(move.x, move.y, currentPlayer);
}

IA.prototype.mobility = function(board, currentPlayer) {
    var aiMoves = board.getAllValidMoves(currentPlayer).length;
    var oppMoves = board.getAllValidMoves(currentPlayer ? 0 : 1).length;
    return Math.ceil((oppMoves + aiMoves) === 0 ? 0 : 100 * ((aiMoves - oppMoves)/(aiMoves + oppMoves)));
}
  