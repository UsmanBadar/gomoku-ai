import React from 'react';
import {useNavigate} from 'react-router-dom';

type Move = {
    player: string;
    turn: number;
  }
  
  type gameState = {
    virtualBoard: Move [][];
    result: string;
}

type localStorage ={
    userGames:Record<string, gameState>;
    setUserGames: any
  }

export default function Games(props:localStorage) {
    const navigate = useNavigate();
    const {userGames, } = props;
    const keys = Object.keys(userGames)
    console.log(keys);

    


  return (
    <>
    {keys.map((key, index)=>
        <div key={key}  onClick={() => navigate(`/game-log/${key}`)}>
            Game #{key} Result: {userGames[key]['result']}
        </div>
     
    )}
    </>
  )
}
