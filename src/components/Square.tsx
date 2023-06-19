import React, {useState, useEffect} from 'react';
import style from './Square.module.css';
import {SquarePropsType} from '../types';


export default function Square(props : SquarePropsType ){
  const {row, column, selected, player, setPlayer, turn, setTurn, dispatch, boardState} = props;
  const [status, setStatus] = useState(
    selected? 'selected' : 'available'
  );
  const [playerOfSquare, setPlayerOfSquare] = useState<string>('available');

  const handlePlayerClick = (row: number, column: number) => {
    if(status === 'available' && player === 'black'){
      setTurn(turn + 1);
      dispatch({ player, turn, row, column });
      setStatus('selected');
      setPlayer('white');
    } else {
      return null;
    }
  }

  useEffect(() => {
    setStatus(boardState[row][column].player === '' ? 'available' : 'selected');
    setPlayerOfSquare(boardState[row][column].player);
  }, [row, column, boardState, setStatus, setPlayerOfSquare]);

  if(status === 'available'){ 
    return <div className={`${style.square} ${style.available}`}onClick = {()=>{handlePlayerClick(row, column)}}> </div> 
  } else if(status === 'selected' && playerOfSquare === 'black'){
    return <div className={`${style.square} ${style.black}`}> </div> 
  } else if(status === 'selected' && playerOfSquare === 'white'){
    return <div className={`${style.square} ${style.white}`}> </div>
  } else {
    return <div className={`${style.square} ${style.available}`}> </div>
  }  
}
