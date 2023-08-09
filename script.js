'use strict'

const container = document.querySelector('.cell_container');


const gameBoard = (() => {
    let gameDraw = false;
    const BoardCell = (value, marked, empty) => {
        value,
        marked,
        empty = true;
        return { value, empty, marked } // maybe return marked if needed
    };

    let gameBoardState = []
    

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

    function checkForWin() {
    let gameWin = 'false';
    // horizontal
    if (
        (gameBoardState[0].marked === gameBoardState[1].marked && gameBoardState[1].marked === gameBoardState[2].marked && gameBoardState[1].marked !== undefined) ||
        (gameBoardState[3].marked === gameBoardState[4].marked && gameBoardState[4].marked === gameBoardState[5].marked && gameBoardState[4].marked !== undefined) ||
        (gameBoardState[6].marked === gameBoardState[7].marked && gameBoardState[7].marked === gameBoardState[8].marked && gameBoardState[7].marked !== undefined)
        ) {
        console.log('horizontal win!');
        gameWin = true;
    }

    // diagonal
    if (gameBoardState[4].marked !== undefined) {
        if (
            (gameBoardState[0].marked === gameBoardState[4].marked && gameBoardState[4].marked === gameBoardState[8].marked) ||
            (gameBoardState[2].marked === gameBoardState[4].marked && gameBoardState[4].marked === gameBoardState[6].marked)
        ) {
            console.log('diagonal win!');
            gameWin = true;
        }
    }

    // vertical 
    if (
        (gameBoardState[0].marked === gameBoardState[3].marked && gameBoardState[3].marked === gameBoardState[6].marked && gameBoardState[3].marked !== undefined) ||
        (gameBoardState[1].marked === gameBoardState[4].marked && gameBoardState[4].marked === gameBoardState[7].marked && gameBoardState[4].marked !== undefined) ||
        (gameBoardState[2].marked === gameBoardState[5].marked && gameBoardState[5].marked === gameBoardState[8].marked && gameBoardState[5].marked !== undefined) 
    ) {
        console.log('vertical win');
        gameWin = true;
    }

    // tie
    /*

    (() => {
                const checkMarked = arr => arr.every((obj) => {
                    return obj.empty === false;
                })
        
                let results = []
                for (let i = 0; i < 3; i++) {
                    let result = checkMarked(gameBoard[i]);
                    results.push(result);
                }
        
                const checkTrue = arr => arr.every((val) => {
                    return val === true;
                })
        
                if (results.length === 3) {
                    let answer = checkTrue(results);
                    if (answer === true) {
                        if (gameWin === false) {
                            gameDraw = true;
                        }
                    }
                }
            })();



    */

    console.log('gameWin inside func is ' + gameWin)
    return gameWin
    }

    checkForWin();
    
    // console.log ('gameWin outisde func is ' + gameWin);

    return { 
        gameBoardState,
        container,
        checkForWin
    }

})();

const Player = (name, marker) => {
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
        } else alert('Please choose another spot!');
        gameBoard.checkForWin();
       console.log('checked for win');
       // gamePlay.checkGameOver();
       gameFlow.checkGameOver();
       console.log(board);  
       return gameFlow.setActivePlayer().switchPlayer();
    }; 

    return { 
        name, 
        marker,
        playAMove
    };
}

const gameFlow = (() => {
    let winner;
    let gameEnd = false;

    const playerOne = Player('Player One', 'X');
    const playerTwo = Player('Player Two', 'O');
    
    const players = [ playerOne, playerTwo ];
    let activePlayer = players[0];
    
    const setActivePlayer = () => {
        activePlayer
        const switchPlayer = () => {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
            console.log(activePlayer)
        }
        // switchPlayer();
        
        return {
            switchPlayer,
            activePlayer
        }
        
    }

    const checkGameOver = () => {
        console.log(gameBoard.checkForWin());
        console.log('that was win');
        if (gameBoard.checkForWin() === true) {
            declareWinner();
            // endGame();
            console.log('hey people');
            gameEnd = true;
            console.log('game win is TRUE!');
            console.log('active player after WIN is: ' + activePlayer.name)
            return gameEnd;
    } else console.log('nope')
    }

    const declareWinner = () => {
        winner = activePlayer.name = 'Player Two' ? 'Player One' : 'Player Two';
        console.log('The winner is ' + winner);
        return winner;
    }

    // reset board function
    return {
        playerOne,
        playerTwo,
        setActivePlayer,
        checkGameOver
    }
})();

const displayController = (() => {
    const text = document.createElement('div')
    text.setAttribute('id', 'prompt');
    text.innerText = 'Player One, please place your marker';
    board.insertBefore(text, container);
    
    return text
})();


//  TO DO
// REMOVE PROMPT TEXT WHEN DECLAREWINNER RUNS AND REPLACE WITH WINNER NAME