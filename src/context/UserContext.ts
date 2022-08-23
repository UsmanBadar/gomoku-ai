import {createContext} from 'react';


type UserContextType = {
  user: string | undefined;
  boardWidth: number | undefined,
  login: (username:string)=> void,
  getBoardWidth: (width:number)=>void
}

const UserContext = createContext<UserContextType>({} as UserContextType );

export default UserContext;