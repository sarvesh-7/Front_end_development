import React,{useContext,useState} from 'react';
import UserContext from './UserContext';
const ContextProvider = (props)=>{
    const initialToken = localStorage.getItem('USER_TOKEN');
    const userCtx = useContext(UserContext);
    const [idToken,setIdToken] = useState(initialToken);
    const updateToken = (token)=>{
        setIdToken(token);
         //store user token in local storage
         localStorage.setItem('USER_TOKEN', token);
    }
    const userObj = {
        token : idToken,
        updateToken : updateToken
    };
    console.log(userObj);
    return(
        <UserContext.Provider value={userObj}>
            {props.children}
        </UserContext.Provider>
    )
};
export default ContextProvider;