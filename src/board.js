const Piece = require("./piece");

class Board {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;
    this.tiles = [];
    this.pieces = [];
    this.previousClick = true; 
    this.previosRow = null;
    this.previousColumn = null;
    this.previousPiece = null;
    this.currentPiece = null;
    this.currentPlayer = "Player 1";

    this.createPieces()
  }

  shufflePieces() {
    this.pieces = [9,2,3,3,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,9,'S','B','B','B','B','B','B',9,9,9,9,9,9,9,9,9,"F",1]
    let j, x, i;
    for (i = this.pieces.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.pieces[i];
        this.pieces[i] = this.pieces[j];
        this.pieces[j] = x;
    }
    return this.pieces;
  }
  
  createPieces(){
    this.shufflePieces()
    for(let r=0; r<4; r++) {
      this.tiles[r] = [];
      for(let c=0; c<10; c++) {
        this.tiles[r][c] = new Piece("Player 1", this.pieces.pop(), "#fcf4b1", false)
      }
    }

    for(let r=4; r<6; r++) {
      this.tiles[r] = [];
      for(let c=0; c<10; c++) {
        this.tiles[r][c] = null
      }
    }

    this.shufflePieces()
    for(let r=6; r<10; r++) {
      this.tiles[r] = [];
      for(let c=0; c<10; c++) {
        this.tiles[r][c] = new Piece("Player 2", this.pieces.pop(), "#401b0f", false)
      }
    }
  }


  validMove(row, column){
    if (this.insideLake(row, column)){
      alert("Can not move inside the lake!")
      return false; 
    }
    if ( 
      this.previousPiece.val === 9 && 
      (this.currentPiece == null) && (
      row > this.previousRow + 1 || 
      row < this.previousRow -1 || 
      column > this.previousColumn + 1 ||
      column < this.previousColumn - 1
      )
    ){
      if (
        this.previousPiece.player != this.currentPlayer || 
        this.previousColumn != column && this.previousRow != row
      ){
        return false;
      } else {
        return true 
      }
    }
        
    if (this.previousPiece.val === "B" || this.previousPiece.val === "F"){
      return false;
    }

    if ( this.previousPiece.player != this.currentPlayer){
      return false;
    }

    return this.validSingleTileMove(row, column)
    
  }

  validSingleTileMove(row, column){
    if(this.previousColumn != column && this.previousRow != row){
      return false;
    }

    return (
      (this.currentPiece == null || this.currentPiece.player !== this.currentPlayer) && 
      row <= this.previousRow + 1 && 
      row >= this.previousRow -1 && 
      column <= this.previousColumn + 1 && 
      column >= this.previousColumn - 1
    )
  }

  insideLake(row, column){
    return (
      (row >= 4 && row <=5) && (
      (column >= 2 && column <=3) || 
      (column >= 6 && column <= 7)  
      )
    )
  }

  render(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawTiles();
    this.drawCurrentPlayer();
    this.drawLakes();
  }

  drawLakes(){
    this.ctx.fillStyle = '#49b1c5';
    this.ctx.fillRect(140, 280, 140, 140);
    this.ctx.fillRect(420, 280, 140, 140);
  }

  drawTiles(){
    const images = {
      B: document.getElementById("bomb"),
      F: document.getElementById("flag"),
      S: document.getElementById("spy"),
      1: document.getElementById("one"),
      2: document.getElementById("two"),
      3: document.getElementById("three"),
      4: document.getElementById("four"),
      5: document.getElementById("five"),
      6: document.getElementById("six"),
      7: document.getElementById("seven"),
      8: document.getElementById("eight"),
      9: document.getElementById("nine"),
    }
    
    let tileWidth = 70;
    let tileHeight = 70;
    let tilePadding = 0;
    let tileOffsetTop = 0;
    let tileOffsetLeft = 0;

    for(let r=0; r<10; r++) {
      for(let c=0; c<10; c++) {
        let tileX = (c*(tileHeight+tilePadding))+tileOffsetTop;
        let tileY = (r*(tileWidth+tilePadding))+tileOffsetLeft;
        this.ctx.beginPath();
        this.ctx.rect(tileX, tileY, tileWidth, tileHeight);
        let currentTile = this.tiles[r][c]

        if(currentTile && currentTile.selected){
          this.ctx.fillStyle = "#4d953c"
        } else {
          this.ctx.fillStyle = "#5eb549"
        }                 
        this.ctx.fill();
        this.ctx.strokeStyle = "#401b0f";
        this.ctx.stroke();

        if (currentTile){
          if (currentTile.val === "B" || currentTile.val === "F"){
            this.ctx.drawImage(images[currentTile.val], tileX+10, tileY+10, 55, 55);
          }
          else {
            this.ctx.fillStyle = currentTile.color;
            this.ctx.font = "20px Arial";
            this.ctx.fillText(currentTile.val, tileX+5, tileY+20);
            this.ctx.drawImage(images[currentTile.val], tileX+10, tileY+10, 65, 65);
          }
        }


        this.ctx.closePath();        
      }
    }
  }

  drawCurrentPlayer(){
    document.getElementsByClassName("player-turn")[0].innerText = `${this.currentPlayer}'s Turn. Select piece and then click to move.`
  }

}

module.exports = Board;