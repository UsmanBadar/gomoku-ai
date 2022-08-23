import {useState} from 'react';
import {UserContext} from '../context';

type UserProviderProps = {
  children: React.ReactNode;
}


export default function UserProvider({children}: UserProviderProps){
  const [user, setUser] = useState <string | undefined>(undefined);
  const [boardWidth, setBoardWidth] = useState<number | undefined>(0);
  const login = (username:string)=>setUser(username);
  const getBoardWidth = (width:number)=>setBoardWidth(width);

  return (
    <UserContext.Provider value={{user, boardWidth, login, getBoardWidth}}>
      {children}
    </UserContext.Provider>
  )
}