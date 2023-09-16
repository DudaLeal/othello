function Player(name, number, isIa, qtdPieces) {
    this.name = name;
    this.number = number;
    this.isIa = isIa;
    this.color = number === 0 ? "black" : "white";
    this.qtdPieces = qtdPieces ? qtdPieces : 2;

    if(this.isIa){
        this.IA = new IA(this.number);
    }
}

Player.prototype.getMove = function(board) {
    return this.IA.move(board);
}