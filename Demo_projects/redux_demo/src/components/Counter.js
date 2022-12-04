import classes from './Counter.module.css';
import {useSelector,useDispatch} from 'react-redux';

const Counter = () => {

  //get counter state from redux store
  const counter = useSelector(state=>state.counter);
  const dispatch = useDispatch();

  //increment counter by 1
  const incrementHandler = ()=>{
    dispatch({type:'increment'});
  }

  //decrement counter by 1
  const decrementHandler = ()=>{
    dispatch({type:'decrement'});
  }

    //increment counter by 2
    const increaseHandler = ()=>{
      dispatch({type:'increase', value:2 });
    }
  
    //decrement counter by 2
    const decreaseHandler = ()=>{
      dispatch({type:'decrease', value:2});
    }

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseHandler}>Increment by 2</button>
        <button onClick={decreaseHandler}>Decrement by 2</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
