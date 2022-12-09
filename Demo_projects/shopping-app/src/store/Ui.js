import {createSlice} from '@reduxjs/toolkit';

const initialUiState = {
    notification : null,
};

const UiSlice = createSlice(
    {
        name : 'UI',
        initialState : initialUiState,
        reducers : {
           showNotification(state,action){
            state.notification = {
                status : action.payload.status,
                title : action.payload.title,
                message : action.payload.message
            }
           } 
        }
    }
);

export default UiSlice.reducer;
export const UiAction = UiSlice.actions;

