'use strict'


const gameBoard = (() => {
    const BoardCell = (value, marked, empty) => {
        value,
        marked, 
        empty = true;
        return { value, empty } // maybe return marked if needed
    };

    let gameBoardState = []
    const container = document.querySelector('.cell_container');

    function addToBoard() {
        for (let i = 0; i < 9; i++) {
            let cell = BoardCell(i);
            gameBoardState.push(cell);
            const divCell = document.createElement('div');
            divCell.setAttribute('class', 'cell');
            divCell.setAttribute('id',gameBoardState[i].value);
            divCell.innerText = i;
            container.appendChild(divCell);
        }
        console.log(gameBoardState);
    }
    addToBoard();


    function checkForWin(
        gameBoardState, 
        player = gameFlow.activePlayer.marker
        ) {

        // diagonal
        if (
        (gameBoardState[1] === player && gameBoardState[5] === player && gameBoardState[9] === player) ||
        (gameBoardState[3] === player && gameBoardState[5] === player && gameBoardState[7] === player) 
        ) {
            return true;
        }

        // horizontal
        if (
            (gameBoardState[0] === player && gameBoardState[1] == player && gameBoardState[2] === player) ||
            (gameBoardState[3] === player && gameBoardState[4] == player && gameBoardState[5] === player) ||
            (gameBoardState[6] === player && gameBoardState[7] == player && gameBoardState[8] === player)
        ) {
            return true;
        }

        // vertical 
        if (
            (gameBoardState[0] === player && gameBoardState[3] == player && gameBoardState[6] === player) ||
            (gameBoardState[1] === player && gameBoardState[4] == player && gameBoardState[7] === player) ||
            (gameBoardState[2] === player && gameBoardState[5] == player && gameBoardState[8] === player) 
        ) {
            return true;
        }
    }

    return { 
        gameBoardState,
        container,
        checkForWin
    }
})();

// maybe delete marked inside playAMove? - may not need
const Player = (name, marker, playerType) => {
    name
    const playAMove = (
        cell, // correspond to DOM div ID
        activePlayer = gameFlow.setActivePlayer().activePlayer,
        board = gameBoard.gameBoardState,
        displayCell = gameBoard.container) => {
        if (board[cell].empty === true) {
            document.getElementById(cell).innerText = `${activePlayer.marker}`;

            board[cell].empty = false;
            board[cell].marked = activePlayer.marker;
            //game.gamePlay();
            gameFlow.setActivePlayer();
        } else alert('Please choose another spot!');
       console.log(board);  
    }; 

    return { 
        name, 
        marker, 
        // playerType,
        playAMove 
    };
}

const gameFlow = (() => {
    let winner;
    let gameEnd = false;

    const playerOne = Player('Player One', 'X');
    // set playerTwo type as person || computer
    const playerTwo = Player('Player Two', 'O');
    
    const players = [ playerOne, playerTwo ];
    let activePlayer = players[0];
    
    function setActivePlayer() {

        const switchPlayer = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        }
        switchPlayer();

        return {
            switchPlayer,
            activePlayer
        }
        
    }

    const gamePlay = () => { //gameplay used to be called checkWinner
        let gameWin = false;
        let gameDraw = false;
    }

    // reset board function
    return {
        playerOne,
        playerTwo,
        setActivePlayer,
        gamePlay
    }
})();
