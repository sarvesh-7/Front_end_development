import {createStore} from 'redux';
import {createSlice,configureStore} from '@reduxjs/toolkit';

//intial state for counter slice
const initialCounterState = {counter : 0, showCounter : true};

//initial state for auth slice
const initialAuthState = {isAuthenticated : false};

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


//create slice for auth state
const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        login(state){
            state.isAuthenticated = true;
        },
        logout(state){
            state.isAuthenticated = false;
        }
    }
})

// const store = createStore(counterReducer);
const store = configureStore({
    reducer : { counter : counterSlice.reducer, auth : authSlice.reducer}
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;