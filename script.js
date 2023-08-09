'use strict'

const container = document.querySelector('.cell_container');
let gameWin = false
let gameEnd = false;
let gameDraw = false;

const gameBoard = (() => {
    
    const BoardCell = (value, marked, empty) => {
        value,
        marked,
        empty = true;
        return { value, empty, marked }
    };

    let gameBoardArr = []
    
    function addToBoard() {
        for (let i = 0; i < 9; i++) {
            let cell = BoardCell(i);
            gameBoardArr.push(cell);
            
            const divCell = document.createElement('div');
            divCell.setAttribute('class', 'cell');
            divCell.setAttribute('id',gameBoardArr[i].value);
            divCell.innerText = i;
            container.appendChild(divCell);
        }
        console.log(gameBoardArr);
    }
    addToBoard();

    return {
        gameBoardArr
    } 

})();

const Player = (name, marker) => {
    const playMove = (
        cell, // correspond to DOM div ID
        activePlayer,
        board = gameBoard.gameBoardArr,
        container) => {
        if ((board[cell].empty === true) && (gameWin !== true)) {
            document.getElementById(cell).innerText = `${marker}`;
            board[cell].empty = false;
            board[cell].marked = marker;
            gamePlay().checkWin();
            gamePlay().checkGameOver();
            gamePlay().switchPlayer();
            displayController.updateDisplay();
        } else if (board[cell].empty !== true) {
            alert('Please choose another spot!');
        } else if (gameEnd === true) {
            // do nothing
        }
    }
    return { 
        name, 
        marker,
        playMove
    };
}

const playerOne = Player('Player One', 'X');
const playerTwo = Player('Player Two', 'O');

const players = [ playerOne, playerTwo ];
let activePlayer = players[0];

const gamePlay = () => {

    function switchPlayer() {
        if (gameWin !== true) {
            activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
            console.log('Active player is ' + activePlayer.name)
            return activePlayer
        }
        
    }

    function checkWin() {
        let board = gameBoard.gameBoardArr;
        // horizontal
        if (
        (board[0].marked === board[1].marked && board[1].marked === board[2].marked && board[1].marked !== undefined) ||
        (board[3].marked === board[4].marked && board[4].marked === board[5].marked && board[4].marked !== undefined) ||
        (board[6].marked === board[7].marked && board[7].marked === board[8].marked && board[7].marked !== undefined)
        ) {
            console.log('horizontal win!');
            gameWin = true;
            return gameWin;
        }

        // diagonal
        if (board[4].marked !== undefined) {
            if (
                (board[0].marked === board[4].marked && board[4].marked === board[8].marked) ||
                (board[2].marked === board[4].marked && board[4].marked === board[6].marked)
            ) {
                console.log('diagonal win!');
                gameWin = true;
            }
        }

        // vertical 
        if (
            (board[0].marked === board[3].marked && board[3].marked === board[6].marked && board[3].marked !== undefined) ||
            (board[1].marked === board[4].marked && board[4].marked === board[7].marked && board[4].marked !== undefined) ||
            (board[2].marked === board[5].marked && board[5].marked === board[8].marked && board[5].marked !== undefined) 
        ) {
            console.log('vertical win');
            gameWin = true;
        }
    }

    const checkGameOver = () => {
        if (gameWin === true) {
            // declareWinner();
            // endGame();
            let winner = activePlayer;
            gameEnd = true;
            console.log('game win is TRUE!');
            console.log('The winner is: ' + winner.name);
            return {winner}
            // displayController.text.remove();
            // displayController.text.innerText = 'The winner is ' + `${activePlayer.name}`
            // board.insertBefore(displayController.text, container);
            // return gameEnd;
        } // else console.log('nope')
    }

    return {
        switchPlayer,
        checkWin,
        checkGameOver
    }
}

const displayController = (() => {
    const text = document.createElement('div');
    text.setAttribute('class', 'prompt');
    text.innerText = 'Please place your marker, ' + activePlayer.name;
    board.insertBefore(text, container);
    
    const updateDisplay = () => {
        text.innerText = activePlayer.name + '\'s turn!';
        board.insertBefore(text, container);
        
        if ((gameWin === true) && (gameEnd === true)) {
            text.remove();
            text.innerText = 'The winner is ' + activePlayer.name
            board.insertBefore(text, container);
        }

    }

    // reset board
    function resetBoard() {
        for (let i = 0; i < 9; i++) {
            document.getElementById(i).innerText = i;
        }
    }
    // resetBoard();


    return {
        updateDisplay,
        text
    }
    
})();


/*



const gameFlow = (() => {



    
    return {
        playerOne,
        playerTwo,
        setActivePlayer,
        checkGameOver
    }
})();



*/


//  TO DO
// REMOVE PROMPT TEXT WHEN DECLAREWINNER RUNS AND REPLACE WITH WINNER NAME
// REMOVE NUMBERS FROM GRID