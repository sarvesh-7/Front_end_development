import React from 'react';

import './ExpenseFilter.css';

const ExpensesFilter = (props) => {
  //pass year to expense component
  const onChangeHandler = e =>{
    // console.log(e.taget.value);
    props.onChangeYear(e.target.value);
  }
  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select value = {props.selected} onChange={onChangeHandler}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;