import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Auth';
import mailsReducer from './Mails';


const store = configureStore(
    {
        reducer : {auth : authReducer, mails : mailsReducer}
    }
);

export default store;