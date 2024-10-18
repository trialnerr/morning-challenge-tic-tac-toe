//there should be players
// - there are two possible players 'X' and '0'
// - each player should be able to play 
class Player{
  constructor(str) {
    this.player = str; 
    this.score = 0; 
  }

  updateScore() {
    this.score++; 
  }
}

//there should be a board
//- the board should keep track of all the current plays
//- 
class Board{
  constructor() {
    this.board = new Array(9).fill(''); 
    this.win = false; 
    this.enabled = true; 
  }

  //update the currentBoard with the id and player
  updateBoard(id, player) {
    this.board[id] = player; 
  }
  
  //a function that takes in nothing, and updates Board's win prop to true
  checkWin() {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
     

    winningConditions.forEach((combo) => {
      
      if (
        this.board[combo[0]] === this.board[combo[1]] &&
        this.board[combo[1]] === this.board[combo[2]] &&
        this.board[combo[0]] != ''
      ) {
        this.win = true;
        this.enabled = false; 
      }
    });
  }
}

//there should be the game class itself 
//- there should be a way to switch the currentPlayer
//- there should be a way to checkWinner 
//- a way to end the game 
//- make all the buttons have an eventListener
class Game{
  constructor() {
    this.players = [new Player('X'), new Player('O')]; 
    this.gameBoard = new Board(); 
    this.currentPlayer = this.players[0]; 
  }

  //if the currPlayer was X switch to O and O switch to X
  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer.player === 'X' ? this.players[1] : this.players[0];
    console.log('player switched'); 
  }

  //apply an event listener on all the buttons
  applyEventListener(){
    const squares = document.querySelectorAll('.square'); 
    squares.forEach(square => square.addEventListener('click', (e) => this.handleClick(e)));
  }

  updateDOM(event) {
    console.log(event);
    event.target.innerText = this.currentPlayer.player;
   }

  updateScore() {
    this.currentPlayer.updateScore(); 
    document.querySelector(`#X`).innerText = this.players[0].score; 
    document.querySelector(`#O`).innerText = this.players[1].score;
}
  //when a button is clicked, i want to be able to get the id of the clicked button and return it
  //and update the board
  //it should also switch the currentPlayer
  async handleClick(e) {
    if (!this.gameBoard.enabled) {
      return;
    } 
 
    const id = e.target.id; 
    const index = id[id.length - 1]; 
    const winMessage = document.querySelector('.winMessage'); 
    //update the board with the currentPlayer
    console.log('gamebordIndex', this.gameBoard.board[index]);
 
    //we do this so that we dont update a space that already has been updated
    if (this.gameBoard.board[index] === '') {
      this.gameBoard.updateBoard(index, this.currentPlayer.player);
      this.updateDOM(e); 
      console.log(this.gameBoard.board);
      this.gameBoard.checkWin(); 

      if (this.gameBoard.win === true) {
        this.updateScore();
        const game = this; 
        //display a you won message
        winMessage.textContent = `${this.currentPlayer.player} wins!`
  
        setTimeout(() => {
          this.refresh();
          winMessage.textContent = '';
          this.gameBoard.win = false;
          this.gameBoard.enabled = true; 
        }, 2000);
      }

      //if the board is full and no empty strings at all 
      //end the game and reset. 
     else if (this.gameBoard.board.every(el => el !== '')) {
        winMessage.textContent = 'Draw!';
        setTimeout(() => {
          this.refresh(); 
          winMessage.textContent = '';
        }, 2000);
      }

      this.switchPlayer();
    }
    
  }

  refresh() {
    //loop through this.gameBoard and if there is something there 
    //query that thing from the dom and make it have nothing
    
    this.gameBoard.board.forEach((item, index) => {
      if (item !== '') {
        document.querySelector(`#square${index}`).innerText = ''; 
      }
    })
    this.gameBoard.board = Array(9).fill(""); 
    this.currentPlayer = this.players[0];
    
 }
}

const currGame = new Game(); 
currGame.applyEventListener(); 


//confetti 
//draw a line across on win
//sounds? 
//add playing against the computer
//make it responsive!
