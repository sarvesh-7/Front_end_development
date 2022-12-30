import {createSlice,current} from '@reduxjs/toolkit';

const initialMailState = {
    mails : [],
    sentBox : []
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
            markEmailAsSeen(state,action){
                let mailsArr = state.mails;
                const index = mailsArr.findIndex((mail)=>mail.id===action.payload);
                mailsArr[index].seen = true;
                state.mails = mailsArr;
            },
            deleteMail(state,action){
                let mailToBeDeleted = action.payload.email;
                const index = state.mails.findIndex((mail)=>mail.id===mailToBeDeleted.id);
                state.mails.splice(index,1);
            },
            addSentMails(state,action){
                state.sentBox = action.payload.mails;
            },
            deleteSentMail(state,action){
                let mailToBeDeleted = action.payload.email;
                const index = state.sentBox.findIndex((mail)=>mail.id===mailToBeDeleted.id);
                state.sentBox.splice(index,1);
            }
        }   
    }
);

export default MailsSlice.reducer;
export const MailsAction = MailsSlice.actions;