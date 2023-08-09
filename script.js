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

    return {
        gameBoardArr,
        BoardCell
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
        } else if ((board[cell].empty !== true) && (gameEnd !== true)){
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

    let board = gameBoard.gameBoardArr;

    function switchPlayer() {
        if (gameWin !== true) {
            activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
            return activePlayer
        }
    }

    function checkWin() {
        // horizontal
        if (
        (board[0].marked === board[1].marked && board[1].marked === board[2].marked && board[1].marked !== undefined) ||
        (board[3].marked === board[4].marked && board[4].marked === board[5].marked && board[4].marked !== undefined) ||
        (board[6].marked === board[7].marked && board[7].marked === board[8].marked && board[7].marked !== undefined)
        ) {
            gameWin = true;
            return gameWin;
        }

        // diagonal
        if (board[4].marked !== undefined) {
            if (
                (board[0].marked === board[4].marked && board[4].marked === board[8].marked) ||
                (board[2].marked === board[4].marked && board[4].marked === board[6].marked)
            ) {
                gameWin = true;
            }
        }

        // vertical 
        if (
            (board[0].marked === board[3].marked && board[3].marked === board[6].marked && board[3].marked !== undefined) ||
            (board[1].marked === board[4].marked && board[4].marked === board[7].marked && board[4].marked !== undefined) ||
            (board[2].marked === board[5].marked && board[5].marked === board[8].marked && board[5].marked !== undefined) 
        ) {
            gameWin = true;
        }

        // tie
        const checkMarked = arr => arr.every((obj) => {
            return obj.marked !== undefined;
        });
        
        let answer = checkMarked(board);
        if ((gameWin !== true) && (answer === true)) {
            gameDraw = true
        }

    }

    const checkGameOver = () => {
        if (gameWin === true) {
            let winner = activePlayer;
            gameEnd = true;
            return { winner }
        } else if (gameDraw === true) {
            gameEnd = true;
        }
    }

    return {
        switchPlayer,
        checkWin,
        checkGameOver
    }
}

const displayController = ((
    boardDisplay = gameBoard.gameBoardArr
    ) => {

        function addToBoard() {
        for (let i = 0; i < 9; i++) {
            let cell = gameBoard.BoardCell(i);
            boardDisplay.push(cell);
            
            const divCell = document.createElement('div');
            divCell.setAttribute('class', 'cell');
            divCell.setAttribute('id',boardDisplay[i].value);
            container.appendChild(divCell);
        }
    }
    addToBoard();


    const text = document.createElement('div');
    text.setAttribute('class', 'prompt');
    text.innerText = 'Please place your marker, ' + activePlayer.name;
    board.insertBefore(text, container);
    
    const updateDisplay = () => {
        text.innerText = activePlayer.name + '\'s turn!';
        board.insertBefore(text, container);
        
        if (gameWin === true) {
            text.remove();
            text.innerText = 'The winner is ' + activePlayer.name
            board.insertBefore(text, container);
        }

        if (gameDraw === true) {
            text.remove();
            text.innerText = 'It\'s a tie!';
            board.insertBefore(text, container);
        }

        const page = document.querySelector('.page');
        const newGameBtn = document.createElement('button');
        newGameBtn.innerText = 'Play again?';
        const display = document.querySelector('#board');

        if (gameEnd === true) {
            display.style.opacity = 0.6;
            page.appendChild(newGameBtn); 
        }

        newGameBtn.addEventListener('click', () => {
            location.reload();
        });
    }

    // add event listeners
    const cellList = document.querySelectorAll('.cell');

    cellList.forEach((cell) => {
        cell.addEventListener('click', () => {
            activePlayer.playMove(cell.id);
        })
        
        cell.addEventListener('mouseenter', () => {
            if (gameEnd !== true) {
                cell.style.backgroundColor = '#F6BDD1';
            } else {
                // do nothing
            }
        })

        cell.addEventListener('mouseleave', () => {
            cell.style.backgroundColor = '#060606'
        })

    })

    return {
        updateDisplay,
        text
    }
    
})();


//  TO DO
// REMOVE NUMBERS FROM GRID