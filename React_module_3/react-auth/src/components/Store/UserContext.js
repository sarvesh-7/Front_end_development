import React,{createContext} from 'react';
const UserContext = createContext(
    {
       token : '',
       updateToken : (token)=>{} 
    }
);
export default UserContext;