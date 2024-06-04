import { useState } from "react"
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Logs from "./components/Logs";
import GameOver from "./components/GameOver";

import {WINNING_COMBINATIONS} from './winning-combination';
 
const PLAYERS = {
  X:"Player 1",
  O: "Player 2"
}
const initialGameBoard= [
  [null, null, null],
  [null, null ,null], 
  [null, null ,null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer ='O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard,players){
  let winner = null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
  
    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol)
      {
        winner =players[firstSquareSymbol];
    }
    
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])]

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col]=player;
  }
  return gameBoard;
}


function App() {
  const [players, setPlayers] = useState({
    'X':'Player 1',
    'O': 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);

  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;
  function handleSelect(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O': 'X');
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = 
        [{square: {row:rowIndex, col:colIndex}, 
          player:currentPlayer},
        ...prevTurns]
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]:newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player  name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/> 
        <Player  name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/> 
      </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart}/> }
        <GameBoard selectedSquare={handleSelect} board={gameBoard} />
      </div>
      <Logs turns={gameTurns}/>
    </main>
  )
}

export default App
