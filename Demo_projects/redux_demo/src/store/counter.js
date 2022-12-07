import {createSlice} from '@reduxjs/toolkit';

//intial state for counter slice
const initialCounterState = {counter : 0, showCounter : true};

//create state slice for counter state
const counterSlice = createSlice({
    name : 'counter',
    initialState : initialCounterState,
    reducers : {
        increment(state){
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increase(state,action){
            state.counter = state.counter + action.payload;
        },
        decrease(state,action){
            state.counter = state.counter - action.payload;
        },
        toggleCounter(state){
            state.showCounter = !state.showCounter;
        },
    },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;