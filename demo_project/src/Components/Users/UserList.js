import './UserList.css';

const UserList = (props) =>{
    return(
        <div>
            <li className='list_item_style'>
            {props.userName} ({props.userAge} years old) - {props.userCollege}
            </li>
        </div>
    )
}

export default UserList;