import {createContext} from 'react';
const CartContext = createContext({
    cartItems : [],
    amount : 0,
    addItem : item=>{},
    removeItem : id=>{}
});

export default CartContext;