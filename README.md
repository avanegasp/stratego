
## Josh's Stratego 

### Background

Stratego is a game where skillful planning, clever deception and good memory work are used to defeat your opponent. Every time you play the battle is different. 

![wireframes](https://github.com/jprpich/stratego/blob/master/initial.png)

1) Pieces move one square at a time, forward, backward or sideways.
2) Pieces cannot move diagonally. They cannot jump over another piece. They cannot move onto a square already occupied by another piece (unless attacking).
3) Only one piece can be moved on a turn.
4) Smaller numbers beat higher numbers. 
5) You must capture your opponents flag to win. 

This simulation will incorporate several mvps and bonus features outlined in the **Functionality & MVP** and **Bonus Features** sections.  


### Object Oriented Programming 

This game was built using three classes with their respective methods. 
- [ ] game
  - [ ] play
  - [ ] detonateBomb
  - [ ] defeatMarshal
  - [ ] showTie
  - [ ] showWin 
  - [ ] showLose
  - [ ] selectPiece
  - [ ] clearPiece
  - [ ] switchPlayer
- [ ] board
  - [ ] shufflePieces
  - [ ] createPieces
  - [ ] validMove
  - [ ] validSingleTileMove
  - [ ] insideLake
  - [ ] render
  - [ ] drawLakes
  - [ ] drawTiles
  - [ ] drawCurrentPlayer
- [ ] piece 
  - [ ] asignRank


### Functionality & MVP  

With this Josh's Stratego, users will be able to:

- [ ] Start out with pieces setup in random positions, or let users setup board positions.
- [ ] Click on the pieces and move them to positions that are valid. 

In addition, this project will include:

- [ ] An About section describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, and nav links to the Github, my LinkedIn,
and the About modal.

![wireframes](https://github.com/jprpich/stratego/blob/master/stratego.png)

### Architecture and Technologies


This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- Html Canvas for effects rendering
- `Css` for styling
- Webpack


### Bonus features

- [ ] Add bombs that can only be destroy by the 8 piece.
- [ ] Add lake where no pieces can move into. 
- [ ] Add Scouts that can traverse as far as they want in a single turn. 
- [ ] Add Spy that can defeat the 1 piece only when attacking it. 