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
                console.log(mailsArr);
                const index = mailsArr.findIndex((mail)=>mail.id===action.payload.email.id);
                mailsArr[index] = action.payload.email;
                
                // mailsArr.forEach((mail)=>{
                //     if(mail.id===action.payload.email.id)
                //     {
                //         mail = action.payload.email;
                //         console.log(mail);
                //         console.log(mailsArr);
                //         return;
                //     }   
                // });
                console.log(mailsArr);
                state.mails = mailsArr;
            }
        }   
    }
);

export default MailsSlice.reducer;
export const MailsAction = MailsSlice.actions;