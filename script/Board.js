function Board(players, existentBoard) {
    this.size = 8;
    this.players = players;
  
    this.generateBoard();
    this.startBoard(existentBoard);
}

Board.prototype.generateBoard = function() {
    var board = [];
    for (var x = 0; x < this.size; x++) {
        board[x] = [];
        for (var y = 0; y < this.size; y++) {
            board[x][y] = null;
        }
    }
    this.board = board;
}

//Iniciando o tabuleiro com duas pessas brancas e duas pessas pretas
Board.prototype.startBoard = function(existentBoard) {
    if(existentBoard) {
        this.board = existentBoard;
    } else {
        var x = Math.round((this.size/2)-1);
        var y =  Math.round((this.size/2));

        this.board[x][x] = this.players[0].color;
        this.board[y][y] = this.players[0].color;
        this.board[y][x] = this.players[1].color;
        this.board[x][y] = this.players[1].color;
    }
}

Board.prototype.searchUp = function(x, y, player) {
    var pieces = [];

    y--;
    while(y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        y--;
    }

    return [];
}

Board.prototype.searchDown = function(x, y, player) {
    var pieces = [];

    y++;
    while(y < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        y++;
    }
    
    return [];
}

Board.prototype.searchLeft = function(x, y, player) {
    var pieces = [];

    x--;
    while(x >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
    }

    return [];
}

Board.prototype.searchRight = function(x, y, player) {
    var pieces = [];

    x++;
    while(x < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
    }

    return [];
}

Board.prototype.searchUpLeft = function(x, y, player) {
    var pieces = [];

    x--;
    y--;
    while(x >= 0 && y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
        y--;
    }

    return [];
}

Board.prototype.searchUpRight = function(x, y, player) {
    var pieces = [];

    x++;
    y--;
    while(x < this.size && y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
        y--;
    }

    return [];
}

Board.prototype.searchDownLeft = function(x, y, player) {
    var pieces = [];

    x--;
    y++;
    while(x >= 0 && y < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
        y++;
    }

    return [];
}

Board.prototype.searchDownRight = function(x, y, player) {
    var pieces = [];

    x++;
    y++;
    while(x < this.size && y < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
        y++;
    }

    return [];
}

Board.prototype.getOpponentPieces = function(x, y, player) {
    var pieces = [];

    if(this.board[x][y]) {
        return [];
    }

    var up = this.searchUp(x, y, player);
    pieces = pieces.concat(up ? up : []);
    var down = this.searchDown(x, y, player);
    pieces = pieces.concat(down ? down : []);
    var left = this.searchLeft(x, y, player);
    pieces = pieces.concat(left ? left : []);
    var right = this.searchRight(x, y, player);
    pieces = pieces.concat(right ? right : []);
    var upLeft = this.searchUpLeft(x, y, player);
    pieces = pieces.concat(upLeft ? upLeft : []);
    var downLeft = this.searchDownLeft(x, y, player);
    pieces = pieces.concat(downLeft ? downLeft : []);
    var upRight = this.searchUpRight(x, y, player);
    pieces = pieces.concat(upRight ? upRight : []);
    var downRight = this.searchDownRight(x, y, player);
    pieces = pieces.concat(downRight ? downRight : []);
    
    return pieces;
}

Board.prototype.copy = function() {
    var tempPlayers = [];
    for (var i = this.players.length - 1; i >= 0; i--) {
      tempPlayers[i] = new Player(this.players[i].name, this.players[i].number, this.players[i].isIa, this.players[i].qtdPieces);
    };

    var tempBoard = [];
    for (var i = 0; i < this.board.length; i++) {
        tempBoard[i] = this.board[i].slice();
    }
    
    return new Board(tempPlayers, tempBoard);
  }

Board.prototype.validMove = function(x, y, currentPlayer) {
    var player = this.getPlayer(currentPlayer);

    return this.getOpponentPieces(x, y, player).length !== 0;
}

Board.prototype.getAllValidMoves = function(currentPlayer) {
    var validMoves = [];

    for (var x = 0; x < this.size; x++) {
        for (var y = 0; y < this.size; y++) {
            if(this.validMove(x, y, currentPlayer)) {
                validMoves.push({x: x, y: y});
            }
        }
    }

    return validMoves;
}

Board.prototype.flip = function(x, y, currentPlayer) {
    var player = this.getPlayer(currentPlayer);
    var otherPlayer = this.getPlayer(currentPlayer, true);

    var pieces = this.getOpponentPieces(x, y, player)

    for (var i = 0; i < pieces.length; i++) {
        var piece = pieces[i];

        this.board[piece.x][piece.y] = player.color;
    }
    this.board[x][y] = player.color;

    player.qtdPieces += pieces.length + 1;
    otherPlayer.qtdPieces -= pieces.length;
}

Board.prototype.getPlayer = function(currentPlayer, opp) {
    var player;

    if(!opp) {
        player = this.players[currentPlayer]
    } else {
        player = this.players[currentPlayer ? 0 : 1]
    }

    return player;
}