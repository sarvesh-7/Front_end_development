import UserList from './UserList';
import Card from '../UI/Card';
import './Users.css';
const Users = (props) =>{
    return(
        <Card>
            {
            props.userArray.map((user)=>
                (<UserList key = {user.id}
                userName = {user.name} 
                userAge = {user.age}
                />)
            )
            }
        </Card>
    );
}
export default Users;