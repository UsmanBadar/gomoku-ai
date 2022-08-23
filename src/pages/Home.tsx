import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import style from './Home.module.css';
import {Input, Button, Message} from '../components';
import {UserContext} from '../context';

// Home page

export default function Navbar() {
  const [width, setWidth] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const {user, getBoardWidth} = useContext(UserContext);
  const navigate = useNavigate();

  const handleFormSubmit = ()=>{
    if(user === 'admin'){
      if (width >= 5 && width <= 19){
        getBoardWidth(width);
        setError(false);
        navigate('/game');
      }else{
        setError(true);
      }
    }else{
      navigate('/login');
    } 
  }

  return (
    <div className={style.home}>
      <div className = {style.message}>
      {error && <Message variant='error' message="Enter a number between 5 and 19" />}
      </div>
      <form className= {style.homeForm} onSubmit = {(e)=>{e.preventDefault(); handleFormSubmit()}}>
        <Input type="text" placeholder= "Enter a number between 5 and 19" onChange = {(e)=>{setWidth(parseInt(e.target.value)); setError(false)}}/>
        <Button type = "submit">Submit </Button>
      </form>
    </div>
  );
}

