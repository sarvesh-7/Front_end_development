import UserForm from './Components/Users/UserForm';
import Users from './Components/Users/Users';
import {useState} from 'react';

function App() {

  //state to check if new user details added in array
  const[userDet , setUserDet] = useState([]);

  //submit user details
  const submitUserDetails = (userName, userAge,userCollege)=>{
    setUserDet([...userDet, {name : userName, age : userAge, id : Math.random().toString(), college : userCollege }]);
  }
  return (
    <div>
      <UserForm submitUserDetails = {submitUserDetails} />
      <Users userArray = {userDet} />
    </div>
  );
}

export default App;
