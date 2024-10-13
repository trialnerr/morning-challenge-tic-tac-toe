//there should be buttons
// - each button should be clickable
// - each button should have an id so that when that button is clicked i have a way of accessing it
//this is done in the DOM 


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
     
    //for each winning combo check if they are all strictly equal 
    //edge case: 
    winningConditions.forEach((combo) => {
      
      if (
        this.board[combo[0]] === this.board[combo[1]] &&
        this.board[combo[1]] === this.board[combo[2]] &&
        this.board[combo[0]] != ''
      ) {
        this.win = true;
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
    this.players = ['X', 'O']; 
    this.scores = { 'X' : 0, 'O': 0 }
    this.gameBoard = new Board(); 
    // this.currPlayerIndex = 0; 
    this.currentPlayer = 'X'; 
  }

  //if the currPlayer was X switch to O and O switch to X
  switchPlayer() {
    // this.currPlayerIndex = this.currPlayerIndex === 0 ? 1 : 0; 
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    console.log('currPlayer', this.currentPlayer); 
  }

  //apply an event listener on all the buttons
  applyEventListener(){
    const squares = document.querySelectorAll('.square'); 
    squares.forEach(square => square.addEventListener('click', (e) => this.handleClick(e)));
  }

  updateDOM(event){
    console.log(event)
    console.log(document.getElementById(`square${event.target.id}`))
    document.getElementById(`${event.target.id}`).innerText = this.currentPlayer;
   }

   updateScore(){
    this.scores[this.currentPlayer] ++
    console.log(this.scores)
    document.querySelector(`#X`).innerText = `X: ${this.scores['X']}`
    document.querySelector(`#O`).innerText = `O: ${this.scores['O']}`
}
  //when a button is clicked, i want to be able to get the id of the clicked button and return it
  //and update the board
  //it should also switch the currentPlayer
  handleClick(e) {
    console.log('I am in handleClick');
    const id = e.target.id; 
    const index = id[id.length - 1]
    //update the board with the currentPlayer
    console.log('gamebordIndex', this.gameBoard.board[index]);

    if (this.gameBoard.board[index] === '') {
      this.gameBoard.updateBoard(index, this.currentPlayer);
      this.updateDOM(e); 
      console.log(this.gameBoard.board);
      this.gameBoard.checkWin(); 

      if (this.gameBoard.win === true) {
        this.updateScore();
        this.refresh(); 
        this.gameBoard.win = false; 
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
    this.currentPlayer = 'X'; 
 }
}

const currGame = new Game(); 
currGame.applyEventListener(); 
//account for draws! 
//find a way of integrating the player class? 
//have a seperate clas s


