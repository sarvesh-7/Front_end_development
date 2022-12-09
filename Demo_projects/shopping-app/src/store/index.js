import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './Cart';
import UiReducer from './Ui';

const store = configureStore(
{
    reducer : {
        cart : CartReducer,
        UI : UiReducer
    }
});

export default store;