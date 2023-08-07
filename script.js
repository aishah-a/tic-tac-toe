const Player = (playerName, marker, playerType) => {
    playerName
    const playAMove = (cell) => {
        // play move function
        // change cell status to "filled"
        if (cellArray[cell.id].empty === true) {
            cell.innerText = `${activePlayer.marker}`;

            cellArray[cell.id].empty = false;
            cellArray[cell.id].marked = activePlayer.marker;
            game.gamePlay();
            game.switchPlayer();
        } else alert('Please choose another spot!');     
    }; 
    return { 
        playerName, 
        marker, 
        // playerType,
        playAMove 
    };
}

const gameFlow = (() => {
    let winner;
    let gameEnd = false;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        text.innerText = activePlayer.playerName + '\'s turn'
    }

    const gamePlay = () => { //gameplay used to be called checkWinner
        let gameWin = false;
        let gameDraw = false;
    }

    const playerOne = Player('Player One', 'X');
    // set playerTwo type as person || computer
    const playerTwo = Player('Player Two', 'O');
    const players = [ playerOne, playerTwo ];
    let activePlayer = players[0];

    // reset board function
    return {
        playerOne,
        playerTwo,
        activePlayer
    }
})();


const gameBoard = (() => {
    const BoardCell = (value, marked, empty) => {
        value,
        marked, 
        empty = true;
        return { value, empty } // maybe return marked if needed
    };

    let gameBoardState = []

    function addToBoard() {
        for (let i = 0; i < 9; i++) {
            let cell = BoardCell(i);
            gameBoardState.push(cell);
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
        checkForWin
    }
})();

