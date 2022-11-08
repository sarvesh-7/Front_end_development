import CartContext from './CartContext';
import {useState,useEffect} from 'react';

const CartContextProvider = props =>{

    const [items,updateItems] = useState([]); //state to update cart items
    let totalAmount = 0; //total cart amount

    useEffect(()=>{
        const cartData = JSON.parse(localStorage.getItem('cart-data'));
        if(cartData){
            console.log(cartData);
            updateItems([...cartData]);
        }
    }, []);

    //calculate total cart amount by adding each meal quantity * meal price
    for(let i=0; i<items.length; i++){
        totalAmount += +(items[i].quantity * items[i].price).toFixed(2); 
    }

    // const cartobj = {cartArr : 22};
    // console.log( JSON.parse(localStorage.getItem('cart-data')))

    //add items/change qty of existing items to the cart
    const addItem = (item)=>{
        for(let i=0;i<items.length; i++){
            if(items[i].title === item.title){
                items[i].quantity = item.quantity ; 
                localStorage.setItem('cart-data',JSON.stringify(items));
                updateItems([...items]);
                return;
            }
        }
      localStorage.setItem('cart-data',JSON.stringify([...items,item]));
      updateItems((items)=> [...items,item]);
    }

    //remove item from cart
    const removeItem = (itemToBeDeleted)=>{
        items.splice(items.indexOf(itemToBeDeleted),1);
        localStorage.setItem('cart-data',JSON.stringify(items));
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