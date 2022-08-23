import React, {useContext} from 'react';
import { UserContext } from '../context';
import {SquareLog} from '../components';
import {useLocalStorage} from '../hooks';
import {GameState} from '../types';
import {useParams, useNavigate, Navigate} from 'react-router-dom';
import style from './GameLog.module.css';


export default function GameLog() {
  const {user} = useContext(UserContext);
  const [userGames, ] = useLocalStorage<Record<string, GameState>>("UserGames",{});
  const navigate = useNavigate();
  const param = useParams();
  const keys = Object.keys(userGames);

  if(!user){return <Navigate to='/login' replace />}
  
  if(keys.length > 0){
    const id  = keys.find((item)=> item === param.id) as string;
    console.log(userGames[id]);
    const boardLog = userGames[id]['virtualBoard'];
    return(
        <div className={style.gameLogContainer}>
        <div className={style.gameLogBoard}>
        {boardLog.map((gameItem, row)=>
            <div className= {style.gameLogRow} key = {row}>
          {gameItem.map((item, column)=>
            <SquareLog
              key = {column}
              player= {item['player']}
              turn = {item['turn']}
            />
          )}
          </div>
        )}
         </div>
         <button onClick = {()=> navigate('/games')}>Back</button>
        </div>
        )}else{
          return <div><p>There are no games saved in history</p></div>
        }
}
