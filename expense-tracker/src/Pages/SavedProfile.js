import React from "react";
// import ExpenseContext from "../../store/expense-context";
import {useSelector} from 'react-redux';
import classes from './SavedProfile.module.css'
const SavedProfile = (prop) => {

  // const expctx = useContext(ExpenseContext);
  const fullName = useSelector(state=>state.auth.fullName);
  const profilePhoto = useSelector(state=>state.auth.profilePhoto);

  return (
    <React.Fragment>
      <h1 className={classes.title}>Your Profile</h1>
      <main className={classes.main} >
        <div className={classes.main_div}>
            <span className={classes.main_span}>Your Name : </span>
          <span className={classes.main_name}>{fullName}</span>
        </div>
        <div className={classes.photo_div}>
            <span>Your Profile photo</span>
          <img src={profilePhoto} alt="UserPhoto"></img>
        </div>
        <button onClick={prop.editButton}  className={classes.edit_button}>EDIT</button>
      </main>
    </React.Fragment>
  );
};

export default SavedProfile;