import {createSlice} from '@reduxjs/toolkit';

const initialCartState = {
    isVisible : false
};

const cartSlice = createSlice({
    name : 'cart',
    initialState : initialCartState,
    reducers : {
        toggleCart(state){
            state.isVisible = !state.isVisible
        }
    }
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;

