import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import style from './Home.module.css';
import {Input, Button, Message} from '../components';
import {UserContext} from '../context';
import {useLocation} from 'react-router-dom';

export default function Navbar() {
  const [width, setWidth] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {user, getBoardWidth} = useContext(UserContext);

  const handleFormSubmit = ()=>{
    if(user === 'awp'){
      if (width >= 5 && width <= 19){
        getBoardWidth(width);
        setError(false);
        navigate('game');
      }else{
        setError(true);
      }
    }else{
      navigate('login');
    }
  }
  return (
    <>
     <nav className = {style.nav}>
      <h1 className={style.header}>Gomoku</h1>
        <ul className={style.navList}>
          {!user  && <button className={style.navListItem}>Log In</button>}
         {location.pathname === '/' && <button className= {style.navListItem}>Previous Games</button>}
        </ul>
      </nav>
      {error && <Message variant='error' message="Enter a number between 5 and 19" />}
      <form onSubmit = {(e)=>{e.preventDefault(); handleFormSubmit()}}>
        <Input type="text" onChange = {(e)=>setWidth(parseInt(e.target.value))}/>
        <Button type = "submit">Submit </Button>
      </form>
    </>
  );
}

