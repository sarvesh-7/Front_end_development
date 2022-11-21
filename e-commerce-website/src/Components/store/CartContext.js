import {createContext} from 'react';
const CartContext = createContext({
    cartItems : [],
    amount : 0,
    addItem : item=>{},
    removeItem : id=>{},
    token : '',
    updateToken : (token)=>{}
});

export default CartContext;