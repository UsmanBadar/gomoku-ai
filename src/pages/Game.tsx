import React, { useState, useEffect, useReducer, useContext } from 'react';
import { UserContext } from '../context';
import { Square, Message, Button } from '../components';
import { checkGameStatus } from '../utilis/checkGameStatus';
import style from './Game.module.css';
import { useNavigate } from 'react-router-dom';

type gameState = {
    virtualBoard: Move [][];
    result: string;
}

type playerAction = {
    player: string;
    turn: number;
    row: number;
    column: number;
}

type Move = {
  player: string;
  turn: number;
}

type localStorage ={
  userGames:Record<string, gameState>;
  setUserGames: any
}

function reducer(state: gameState, action: playerAction): gameState {

  const { player, turn, row, column } = action;
  const {virtualBoard} = state;
  let newVirtualBoard = virtualBoard;
  newVirtualBoard[row][column]= {player, turn};
  const outcome :string = checkGameStatus(newVirtualBoard, player);
  state = {virtualBoard:newVirtualBoard, result: outcome}
  
  return state;
}

export default function Game(props:localStorage) {
  const [completed, setCompleted] = useState<boolean>(false);
  const [player, setPlayer] = useState<string>('black');
  const [turn, setTurn] = useState<number>(1);
  const {boardWidth} = useContext(UserContext);
  const navigate = useNavigate();
 
  const initialState : gameState = {
    virtualBoard: new Array(boardWidth).fill([]).map(() => 
      new Array(boardWidth).fill({player: "", turn: 0})),
    result: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    if(state['result'] === 'continue'){
      setCompleted(false);
    }else{
      setCompleted(true);
    } 
  }, [state])

  const handleLeaveClick = ():void=>{
    if(completed){
      const {userGames, setUserGames} = props;
      const keys = Object.keys(userGames);
      const id = keys.length + 1;
      setUserGames({...userGames, [id]:state})
    }
  } 

  return ( 
    <>
    {completed && < Message variant='info' message ={state['result']} />}
    {!completed && < Message variant='info' message ={`${player} has turn`} />}
    <div className={style.board}>
      {[...Array(boardWidth)].map((_, row) =>
        <div key={row} className = {style.row}>
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
            
          />
        ))}
        </div>
      )}
      <Button onClick = {()=> handleLeaveClick()}>Leave</Button>
      <Button onClick = {()=>navigate('/')}>Reset</Button>
    </div>
    </>
  );
}

