import React,{Fragment,useRef} from 'react';
import {Link} from 'react-router-dom';
import Button from '../Components/UI/Button';
import classes from './Profile.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {authAction} from '../store/Auth';

import axios from 'axios';

const Profile = (props)=>{

    const dispatch = useDispatch();
    const fullName = useSelector((state)=>state.auth.fullName);
    const profilePhoto = useSelector((state)=>state.auth.profilePhoto);
    const token = useSelector((state)=>state.auth.token);
    const fullNameRef = useRef();
    const profileUrlRef = useRef();

    //path to update user profile in firebase
    const updateProfileUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAzi_a8TFUiRe70M2TSFzybhf5lVXqu7Wc';

    //update user profile in firebase
    const updateProfileHandler = (e)=>{
        e.preventDefault();
        const fullName = fullNameRef.current.value;
        const profileUrl = profileUrlRef.current.value;

            axios.post(updateProfileUrl,
            {
                idToken : token,
                displayName : fullName,
                photoUrl : profileUrl,
                returnSecureToken : true
            })
            .then((res)=>
            {
                alert('Profile updated successfully')
                // authCtx.updateProfile(fullName,profileUrl);
                dispatch(authAction.updateProfile({name : fullName, profileUrl : profileUrl}));
            })
            .catch((error)=>{
                alert('Error while updating profile details');
                console.log(error);
            })
    }

    return(
        <Fragment>
        <div className={`${classes.welcome} font-italic`}>
        <p>Winners never quite,quitters never win.</p>
        {
            !fullName && !profilePhoto &&
            <Fragment>
            <p className={classes.profile}>Your profile is 64% complete.
            <Link to='/profile'>Complete now</Link> 
            </p>
            </Fragment>
        }
        {
            fullName && profilePhoto &&
            <p className={classes.profile}>
            Your profile is now completed.
            </p>
        }
        </div>
        <hr/>
        <div className={classes.main}>
        <div className={classes.formHeader}>
            <span>Contact Details</span>
            <Button className={classes.cancel}>Cancel</Button>
            </div>
        <form className={classes.contactForm}> 
            <label forhtml='full_html'>Full Name</label>
            <input type='text' id='full_html' ref={fullNameRef} defaultValue={fullName}/>
            <label forhtml='profile_url'>Profile Photo URL</label>
            <input type='url' id='profile_url' ref={profileUrlRef} defaultValue={profilePhoto}/>
            <Button type='submit' onClick={updateProfileHandler} className={classes.update}>Update</Button>  
        </form>
        <hr/>
        </div>
        
        </Fragment>
    );
}
export default Profile;