import React, { useMemo } from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items,sortingOrder } = props;


  const sortedList = useMemo(() => {
    console.log('Items sorted');
    if(sortingOrder==='ASC')
    return items.sort((a, b) => a - b);
    else if(sortingOrder==='DESC')
    return items.sort((a, b) => b - a);
  }, [items,sortingOrder]); 

//   const sortedListInDesc = useMemo(() => {
//     console.log('Items sorted in descending order');
//     return items.sort((a, b) => b - a);
//   }, [items]); 
  console.log('DemoList RUNNING');

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);