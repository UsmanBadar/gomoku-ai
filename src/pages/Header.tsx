import React, {useContext} from 'react';
import style from './Header.module.css';
import {UserContext} from '../context';
import {useLocation, useNavigate} from 'react-router-dom';

//Header page of the app
export default function Header() {
    const {user} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

  return (
    <div>
    <nav className = {style.nav}>
        <div className={style.banner} onClick = {()=>navigate('/')}>
            <h1>Gomoku</h1>
        </div>
        <ul className={style.navList}>
            {!user  && 
                <li className={style.navListItem} onClick={()=> navigate('login')}>Login</li>}
            {location.pathname === '/' && user && 
                <li className= {style.navListItem} onClick = {()=>navigate('games')}>Previous Games</li>}
        </ul>
      </nav>
    </div> 
  );
}
