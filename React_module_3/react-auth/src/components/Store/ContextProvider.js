import React,{useContext,useState} from 'react';
import UserContext from './UserContext';
const ContextProvider = (props)=>{
    const userCtx = useContext(UserContext);
    const [idToken,setIdToken] = useState();
    const updateToken = (token)=>{
        setIdToken(token);
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