import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import './CourseInput.css';

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  //state to check if value entered by user is valid or invalid
  const[isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    setIsValid(true);
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
      //trim - remove extra spaces as blank spaces are invalid as well
      if(enteredValue.trim().length === 0){
        setIsValid(false);
        return;
      }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${!isValid ? 'invalid' : ''}`}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button isValidState = {isValid} type="submit">Add Goals</Button>
    </form>
  );
};

export default CourseInput;
