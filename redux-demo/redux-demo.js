//import redux from redux package
const redux = require('redux');

//reducer function to update redux states
const counterReducer = (state,action)=>{
    if(action.type==='increment'){
        return{
            counter : state.counter + 1
        };
    }
    if(action.type==='decrement'){
        return{
            counter : state.counter - 1
        };
    }
    return { counter : 0 };
    
};

//redux central data store
const store = redux.createStore(counterReducer);

//subscriber function which will be called automatically when state updates
const counterSubscriber = ()=>{
    const latestState = store.getState(); //get latest state
    console.log(latestState);
} 

//subscribe above function for the redux store
store.subscribe(counterSubscriber);

//dispatch new action
store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});

store.dispatch({type:'decrement'});