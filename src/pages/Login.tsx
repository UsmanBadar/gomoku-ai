import React, {useState, useContext} from 'react';
import {Message, Input, Button} from '../components';
import {UserContext} from '../context';
import {useNavigate} from 'react-router-dom';
import style from './Login.module.css';

export default function Login(){
  const {login} = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [credentialsInvalid, setCredentialsInvalid] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFormSubmit = ()=>{
    if(username === 'admin' && password === 'admin'){
      login(username);
      setUsername("");
      setPassword("");
      navigate('/');
    }else{
      setCredentialsInvalid(true);
      setUsername("");
      setPassword("");
    }
  }

  return(
    <div className = {style.inputContainer}>
      <div className={style.inputMessage}>
    {credentialsInvalid && < Message variant="error" message = "Invalid username or password"/>}
      </div>
    <form className = {style.inputForm} onSubmit = {(e)=>{
      e.preventDefault();
      handleFormSubmit()
      }}>
      

      <Input
        name = "username"
        placeholder = "Username"
        value = {username}
        onChange = {(e)=>{setUsername(e.target.value); setCredentialsInvalid(false);}}
      />

      <Input
        name="password"
        placeholder = "Password"
        type= "password"
        value={password}
        onChange = {(e)=>{setPassword(e.target.value); setCredentialsInvalid(false);}}
      />
      <Button type = "submit">Submit</Button>
    </form>
  </div>
  )
}

