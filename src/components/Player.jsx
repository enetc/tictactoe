import { useState } from "react";

const Player = ({name, symbol, isActive, onChangeName}) => {
    const [isEditing, setEditing] = useState(false); 
    const [playerName, setPlayerName] = useState(name);
    function handleEdit() {
        setEditing(editing=> !editing);
        if(isEditing){
        onChangeName(symbol, playerName);
        }
    }
    function handleChange(event) {
        // console.log(event);
        setPlayerName(event.target.value);
    }
    let editplayerName = <span className="player-name">{playerName}</span>;
     
    if(isEditing){
        editplayerName = <input type="text" required value={playerName} onChange={handleChange} />;
        
    }
    return ( 
      
         <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {editplayerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
         
     );
}
 
export default Player;