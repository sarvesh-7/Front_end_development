import {createSlice} from '@reduxjs/toolkit';

const initialAuthState = {
    token : '',
    email : ''
};

const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        updateAuthInfo(state,action){
            state.token = action.payload.token;
            state.email = action.payload.email;
        }
    }
});

export default authSlice.reducer;
export const authActions = authSlice.actions;