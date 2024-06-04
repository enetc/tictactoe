const Logs = ({turns}) => {
     
    return ( 
        <ol id="log">
            {turns.map((turn)=> 
            <li key={`${turn.square.row}${turn.square.col}`}>
                Player {turn.player} selected {turn.square.row} , {turn.square.col}
            </li>
         )}
        </ol>
     );
}
 
export default Logs;