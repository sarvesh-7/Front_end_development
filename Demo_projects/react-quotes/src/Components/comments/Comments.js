import { useState,useEffect,useCallback } from 'react';
import {useParams} from 'react-router-dom';
import useHttp from '../../hooks/hooks/use-http';
import {getAllComments} from '../../lib/lib/api';
import CommentsList from './CommentsList';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  //get pointer from useHttp hook to the function getAllComments
  const {sendRequest, status, data : loadedComments} = useHttp(getAllComments);

  //get quote id to get all comments related to it
  const {quoteID} = useParams();

  //fetch all comments when component/page refreshes
  useEffect(()=>{
    sendRequest(quoteID);
  },[quoteID,sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const AddedCommentHandler=useCallback(()=>{
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  let comments;

  //if status is pending i.e comments are being fetched then show loadingSpinner
  if (status==='pending'){
    comments = <div className='centered'>
      <LoadingSpinner/>
      </div>
  }

  //if status is completed and we have comments then show them in the form of list
  if(status==='completed' && loadedComments && loadedComments.length > 0)
  {
    comments = <CommentsList comments={loadedComments}/>
  }

  //if comments are empty
  if(status==='completed' && (!loadedComments || loadedComments.length === 0))
  {
    comments = <p className='centered'>No comments were added yet!</p>;
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId = {quoteID} onAddedComment={AddedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
