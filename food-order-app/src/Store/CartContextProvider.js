import CartContext from './CartContext';
import {useState} from 'react';

const CartContextProvider = props =>{
    const [items,updateItems] = useState([]); //state to update cart items
    let totalAmount = 0; //total cart amount

    //calculate total cart amount by adding each meal quantity * meal price
    for(let i=0; i<items.length; i++){
        totalAmount += +(items[i].quantity * items[i].price).toFixed(2); 
        console.log(totalAmount);
    }

    //add items/change qty of existing items to the cart
    const addItem = (item)=>{
        for(let i=0;i<items.length; i++){
            if(items[i].title === item.title){
                items[i].quantity = item.quantity ; 
                updateItems([...items]);
                return;
            }
        }
      updateItems((items)=> [...items,item]);
    }

    //remove item from cart
    const removeItem = (itemToBeDeleted)=>{
        items.splice(items.indexOf(itemToBeDeleted),1);
        updateItems([...items]);
    };

    //context object which contains all cart items and functions to add/remove cart items
    const CartCtx = {
        cartItems : items,
        amount : totalAmount,
        addItem : addItem,
        removeItem : removeItem,
    }
    return (<CartContext.Provider value={CartCtx}>
        {props.children}
    </CartContext.Provider>);
};

export default CartContextProvider;