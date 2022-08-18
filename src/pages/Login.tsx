import React, {useState, useContext} from 'react';
import {Message, Input, Button} from '../components';
import {UserContext} from '../context';
import {useNavigate} from 'react-router-dom';

export default function Login(){
  const {login} = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [credentialsInvalid, setCredentialsInvalid] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFormSubmit = ()=>{
    if(username === 'awp' && password === 'awp'){
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
    <div>
    {credentialsInvalid && < Message variant="error" message = "Invalid username or password"/>}
    <form onSubmit = {(e)=>{
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

