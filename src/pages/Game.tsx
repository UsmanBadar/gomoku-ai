import React, { useState, useEffect, useReducer, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks';
import { UserContext } from '../context';
import { Square, Message} from '../components';
import { checkGameStatus } from '../utilis/checkGameStatus';
import {aiMove} from '../utilis/ai';
import style from './Game.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import {PlayerAction, GameState, GameReset} from '../types';


function reducer(state: GameState, action: PlayerAction): GameState {
  const { player, turn, row, column } = action;
  const {date, virtualBoard} = state;
  let newVirtualBoard = JSON.parse(JSON.stringify(virtualBoard));
  newVirtualBoard[row][column]= {player, turn};
  const outcome :string = checkGameStatus(newVirtualBoard, player);
  return {date, virtualBoard:newVirtualBoard, result: outcome};
}

export default function Game(props:GameReset) {
  const {gameKey, setGameKey} = props;
  const [userGames, setUserGames] = useLocalStorage<Record<string, GameState>>("UserGames",{});
  const [completed, setCompleted] = useState<boolean>(false);
  const [player, setPlayer] = useState<string>('white');
  const [turn, setTurn] = useState<number>(1);
  const {user, boardWidth} = useContext(UserContext);
  const navigate = useNavigate();
 
  const initialState : GameState = {
    date : new Date().toDateString(),
    virtualBoard: new Array(boardWidth).fill([]).map(() => 
      new Array(boardWidth).fill({player: "", turn: 0, score: 0})),
    result: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    if(state['result'] === 'continue' || state['result'] === ""){
      setCompleted(false);
    }else{
      setCompleted(true);
    } 
  }, [state])

  const makeAiMove = useCallback(() => {
    if (player === 'white' && typeof boardWidth !== 'undefined') {
      const { row, col } = aiMove(state.virtualBoard);
      dispatch({ player, turn, row, column: col });
      setTurn(turn + 1);
      setPlayer('black');
    }
  }, [player, turn, boardWidth, state, dispatch]);

  useEffect(() => {
    if (turn === 1 && player === 'white') {
      makeAiMove();
    } else if (player === 'white' && !completed && state['result'] === 'continue') {
      setTimeout(makeAiMove, 100); 
    }
  }, [player, completed, boardWidth, state, turn, dispatch, makeAiMove]);

  const handleLeaveClick = ():void=>{
    if(completed){
      const keys = Object.keys(userGames);
      const id = keys.length + 1;
      setUserGames({...userGames, [id]:state});
      navigate('/games');
    }else{
      navigate('/');
    }
  } 
  if(!user){return <Navigate to='/' replace />}
  
  return ( 
    <div className={style.gameContainer} >
      <div className={style.gameMessage}>
        {completed && <Message variant='info' message ={state['result']} />}
        {!completed && <Message variant='info' message ={`Current Player: ${player[0].toUpperCase()}${player.substring(1)}`} />}
      </div>
      <div className={`${style.gameBoard} ${completed && style.completed}`}>
        {[...Array(boardWidth)].map((_, row) =>
          <div key={row} className = {style.gameRow}>
          {[...Array(boardWidth)].map((_, column) => (
            <Square
              key={`${row}-${column}`}
              row={row}
              column={column}
              selected={false}
              player={player}
              setPlayer={setPlayer}
              turn={turn}
              setTurn={setTurn}
              dispatch={dispatch}
              boardState={state.virtualBoard}
            />
          ))}
          </div>
        )}
        </div>
        <div className={style.gameButtons}>
          <div className={style.gameButtonLeave}>
            <button onClick = {()=> handleLeaveClick()}>Leave</button>
          </div>
          <div className={style.gameButtonReset}>
            <button onClick = {()=>setGameKey(gameKey + 1)}>Reset</button>
          </div>
        </div>
    </div>
  );
}

