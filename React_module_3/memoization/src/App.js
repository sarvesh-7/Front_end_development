import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import DemoList from './Components/Demo/DemoList';
import Button from './Components/UI/Button/Button';

function App() {
  const [listTitle, setListTitle] = useState('My List');
  const [sortingOrder, setSortingOrder] = useState('ASC');
  const [buttonTitle, setButtonTitle] = useState('sort in descending order');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
    setSortingOrder('ASC');
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  const sortItems = ()=>{
    
    if(sortingOrder==='ASC')
    {
      setButtonTitle('sort in ascending order');
      setSortingOrder('DESC');
    } 
    else if(sortingOrder === 'DESC'){
      setButtonTitle('sort to descending order');
      setSortingOrder('ASC');
    }
    
  }
 

  return (
    <div className="app">
      <DemoList sortingOrder = {sortingOrder} title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
      <Button onClick={sortItems}>{buttonTitle}</Button>
    </div>
  );
}

export default App;