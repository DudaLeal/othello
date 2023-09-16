(function () {
    "use strict"
    var players, currentPlayer, board;
    var boardContainer = $(".boardContainer");
    var table;

    startGame();

    function startGame() {
        players = [
            new Player("preto", 0, false),
            new Player("branco", 1, true)
        ];
        currentPlayer = 0;
        board = new Board(players);
        renderBoard(board.board);
    }

    function renderBoard(board) {
        if(table) {
            for (var y = 0; y < board.length; ++y) {
                for (var x = 0; x < board.length; ++x) {
                    var piece = board[x][y] ? board[x][y] : "";
                    var td = $("#"+x+y).attr('class', "square "+piece);
                }
            }
        } else {
            boardContainer.empty();

            table = "<table class='board'>";
            for (var y = 0; y < board.length; ++y) {
                table += '<tr>';
                for (var x = 0; x < board.length; ++x) {
                    var piece = board[x][y] ? board[x][y] : "";
    
                    table += '<td class="square '+piece+'" id=' + x + y + '><div></div></td>';
                }
            }
            table += " </table>";
            boardContainer.append(table);
            listenClicks();
        }
        
        $(".turn").html("Vez do jogador " + players[currentPlayer].name);
        $("#scoreBlack").text(players[0].qtdPieces);
        $("#scoreWhite").text(players[1].qtdPieces);
        $(".winner").hide();
        $("#playAgain").hide();        

    }

    function listenClicks() {
        $('.board .square').click(function () {
            if(currentPlayer !== 0) {
                return;
            }

            var $this = $(this);
            var x = parseInt($this.attr('id').charAt(0));
            var y = parseInt($this.attr('id').charAt(1));

            proccessMove(x, y);
        });
    }

    function proccessMove(x, y) {
        var valid = board.validMove(x, y, currentPlayer)

        if(valid) {
            var otherPlayer = currentPlayer === 0 ? 1 : 0;
            board.flip(x, y, currentPlayer);
            renderBoard(board.board);

            currentPlayer = otherPlayer;

            var availableMoves = board.getAllValidMoves(currentPlayer);
            if(!availableMoves.length) {
                var availableMovesNextPlayer = board.getAllValidMoves(currentPlayer ? 0 : 1);

                if(!availableMovesNextPlayer.length) {
                    finishGame();
                    return;
                } else {
                    var noTurnPlayerName = players[currentPlayer].name;
                    setTimeout(function(){
                        alert("Jogador " + noTurnPlayerName + " não tem jogadas disponíveis, passando a vez para o próximo");
                    }, 1000);
                    currentPlayer = currentPlayer ? 0 : 1;
                }
            }

            $(".turn").html("Vez do jogador " + players[currentPlayer].name);

            if(players[currentPlayer].isIa) {
                setTimeout(function(){
                    var t0 = performance.now()
                    var move = players[currentPlayer].getMove(board);
                    var t1 = performance.now()
                    console.log("IA process time " + (t1 - t0) + " milliseconds.");

                    proccessMove(move.x, move.y);
                }, 3000);
            }
        }
    }

    function finishGame() {
        var messageWin;

        if(players[0].qtdPieces > players[1].qtdPieces) {
            messageWin = players[0].name + " venceu com " + players[0].qtdPieces + " pe\u00e7as!";
        } else if(players[1].qtdPieces > players[0].qtdPieces) {
            messageWin = players[1].name + " venceu com " + players[1].qtdPieces + " pe\u00e7as!";
        } else {
            messageWin = "EMPATE"
        }
        
        $(".score").hide();
        $(".turn").hide();
        $(".boardContainer").hide();
        $("#restartGame").hide();
        $(".winner").show();
        $(".winner").html(messageWin);
        $("#playAgain").show();        
    }
    $("#playAgain").click(function () {
        startGame();
        $(".score").show();
        $(".turn").show();
        $("#restartGame").show();
        $(".boardContainer").show();
    });
    $("#restartGame").click(function () {
        startGame();
    });
})();