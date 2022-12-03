import classes from './Counter.module.css';
import {useSelector,useDispatch} from 'react-redux';

const Counter = () => {

  //get counter state from redux store
  const counter = useSelector(state=>state.counter);
  const dispatch = useDispatch();

  //increment counter by 1
  const incrementHandler = ()=>{
    dispatch({type:'incrementby5'});
  }

  //decrement counter by 1
  const decrementHandler = ()=>{
    dispatch({type:'decrementby5'});
  }

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
