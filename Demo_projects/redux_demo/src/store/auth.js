import {createSlice} from '@reduxjs/toolkit';

//initial state for auth slice
const initialAuthState = {isAuthenticated : false};

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
});


export const authActions = authSlice.actions;
export default authSlice.reducer;