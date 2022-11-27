import { useRef,useEffect } from 'react';
import {addComment} from '../../lib/lib/api';
import useHttp from '../../hooks/hooks/use-http';
import LoadingSpinner from '../../Components/UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const {sendRequest, status, error} = useHttp(addComment);
  const {onAddedComment} = props;

//check if the status is completed to add comments
  useEffect(()=>{
    if(status==='completed' && !error){
      onAddedComment();
    }
  },[status,error,onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    //get comment entered in the comment form textarea
    const enteredComment = commentTextRef.current.value;
    //send request to server to add comment in the backend
    sendRequest({commentData : {text : enteredComment}, quoteId : props.quoteId});
    // optional: Could validate here

    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {
        status==='pending' 
        && 
        (<div className='çentered'>
          <LoadingSpinner/>
        </div>)
      }
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
