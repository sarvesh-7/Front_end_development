import {createSlice} from '@reduxjs/toolkit';
const initialMailState = {
    mails : []
}

const MailsSlice = createSlice(
    {
        name : 'mails',
        initialState : initialMailState,
        reducers :
        {
            addMails(state,action){
                state.mails = action.payload.mails;
            }
        }   
    }
);

export default MailsSlice.reducer;
export const MailsAction = MailsSlice.actions;