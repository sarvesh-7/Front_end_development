import CartContext from './CartContext';
import {useState,useReducer} from 'react';

const CartContextProvider = props =>{
    const [items,updateItems] = useState([]);
    const [totalAmt , setTotalAmt] = useState(0);
    let totalAmount = totalAmt;

    const addItem = (item)=>{
        for(let i=0;i<items.length; i++){
            if(items[i].title === item.title){
                items[i].quantity =  items[i].quantity + item.quantity ;
                totalAmount += item.quantity * items[i].price;
                setTotalAmt(totalAmount); 
                updateItems(items);
                return;
            }
        }
        totalAmount += item.quantity * item.price;
        setTotalAmt(totalAmount); 
      updateItems((items)=> [...items,item]);
    }
    const removeItem = (id)=>{};

    const CartCtx = {
        cartItems : items,
        amount : totalAmt,
        addItem : addItem,
        removeItem : removeItem,
    }
    return (<CartContext.Provider value={CartCtx}>
        {props.children}
    </CartContext.Provider>);
};

export default CartContextProvider;