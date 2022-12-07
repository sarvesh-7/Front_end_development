import classes from './Counter.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {counterActions} from '../store/counter';

const Counter = () => {

  //get counter state from redux store
  const counter = useSelector(state=>state.counter.counter);
  const show = useSelector(state=>state.counter.showCounter);
  const dispatch = useDispatch();

  //increment counter by 1
  const incrementHandler = ()=>{
    dispatch(counterActions.increment());
  }

  //decrement counter by 1
  const decrementHandler = ()=>{
    dispatch(counterActions.decrement());
  }

    //increment counter by 2
    const increaseHandler = ()=>{
      dispatch(counterActions.increase(2));
    }
  
    //decrement counter by 2
    const decreaseHandler = ()=>{
      dispatch(counterActions.decrease(2));
    }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {
        show && <div className={classes.value}>{counter}</div>
      }
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
