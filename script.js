'use strict'


const gameBoard = (() => {
    let gameWin = false;
    let gameDraw = false;
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

    const checkForWin = () => {
    let position = gameBoardState;

        // diagonal
        (() => {
            if (
                ( (position[0].marked === position[4].marked) && (position[4].marked === position[8].marked) ) ||
                ( (position[2].marked === position[4].marked) &&  (position[4].marked === position[6].marked) )
                ) {
                    gameWin = true;
                    console.log('diagonal win')
                    console.log(gameWin);
                    return gameWin;
                }
            }
        )();

        // horizontal
        (() => {
            if (
                ( (position[0].marked === position[1].marked) && (position[1].marked ===  position[2].marked) ) ||
                ( (position[3].marked === position[4].marked) && (position[4].marked ===  position[5].marked) ) ||
                ( (position[6].marked === position[7].marked) && (position[7].marked ===  position[8].marked) )
             )
              {
                gameWin = true;
                console.log('horizontal win')
                return gameWin;
            }
        })

        // vertical
        (() => {
            if (
                (position[0].marked === position[3].marked) && (position[3].marked === position[6].marked ) ||
                (position[1].marked === position[4].marked) && (position[4].marked === position[7].marked ) ||
                (position[2].marked === position[5].marked) && (position[5].marked === position[8].marked )
            ) {
                gameWin = true;
                console.log('vertical win')
                return gameWin;
            }
        })
        return gameWin;
    }
    

    return { 
        gameBoardState,
        container,
        checkForWin,
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
            gameFlow.setActivePlayer().switchPlayer();
        } else alert('Please choose another spot!');
        // gameBoard.checkForWin();
        gameBoard.checkForWin();
       console.log('checked for win');  
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

    if (gameBoard.gameWin === true) {
        // declareWinner();
        // endGame();
        gameEnd = true;
        console.log('game win is TRUE!')
    } /* else if (gameDraw === true) {
        console.log('it\'s a tie!');
        text.innerText = 'It\s a tie!'
        text.innerText = 'Tie!'
        gameEnd = true;
    }
    */

    // reset board function
    return {
        playerOne,
        playerTwo,
        setActivePlayer,
    }
})();
