import {createSlice,current} from '@reduxjs/toolkit';
// import {current} from 'react-redux';
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
            },
            editMail(state,action){
                let mailsArr = state.mails;
                const index = mailsArr.findIndex((mail)=>mail.id===action.payload.email.id);
                mailsArr[index] = action.payload.email;
                state.mails = mailsArr;
            },
            deleteMail(state,action){
                let mailToBeDeleted = action.payload.email;
                const index = state.mails.findIndex((mail)=>mail.id===mailToBeDeleted.id);
                state.mails.splice(index,1);
            }
        }   
    }
);

export default MailsSlice.reducer;
export const MailsAction = MailsSlice.actions;