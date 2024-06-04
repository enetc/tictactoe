
 const GameBoard = ({selectedSquare, board}) => {
  
    // const [gameBoard, setGameBoard] = useState(initialGameBoard); 
    // function handleSelectSquare(rowIndex, colIndex) {

    //     setGameBoard((prevGameBoard) => {
    //         const updateGameBoard = [...prevGameBoard.map(innderArray => [...innderArray])];
    //         updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updateGameBoard;
    //     });
    //     selectedSquare();
    // }

    return ( 
        <>
        <ol id="game-board">
            {board.map((row, rowIndex) =>  
            <li key={rowIndex}> 
                <ol>
                    {row.map((playerSymbol, colIndex)=>  
                        <li key={colIndex}>  
                            <button onClick={() => selectedSquare(rowIndex, colIndex) } disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li> 
                    )}
                </ol>
            </li> 
        )}
        </ol>
        </>
     );
}
 
export default GameBoard;