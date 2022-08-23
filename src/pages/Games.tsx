import React, {useContext} from 'react';
import { UserContext } from '../context';
import {useNavigate, Navigate} from 'react-router-dom';
import {useLocalStorage} from '../hooks';
import {GameState} from '../types';
import style from './Games.module.css';

export default function Games() {
  const {user} = useContext(UserContext);
  const [userGames, ] = useLocalStorage<Record<string, GameState>>("UserGames",{});
  const navigate = useNavigate();
  const keys = Object.keys(userGames)
  console.log(keys);
  if(!user){return <Navigate to='/login' replace />}
    
  if(keys.length > 0){
    return (
      <>
      {keys.map((key, index)=>
          <div className={style.gameLog} key={key} >
             <p className={style.gameLogMsg}>{`Game # ${key} @ ${userGames[key]['date']} Result: ${userGames[key]['result']}`}</p>
             <button className={style.gameLogButton} onClick={() => navigate(`/game-log/${key}`)}>View game log</button>
          </div>
      )}
      </>
      )}else{
        return <div><p>There are no games in history</p></div>
      }
}
