import {createSlice,current} from '@reduxjs/toolkit';
import {UiAction} from './Ui';

const initialCartState = {
    isVisible : false,
    cartItems : []
};

const cartSlice = createSlice({
    name : 'cart',
    initialState : initialCartState,
    reducers : {
        toggleCart(state){
            state.isVisible = !state.isVisible
        },
        addItems(state,action){
            const product = action.payload;
            //check if the product already exist in the cartItems array
            const cartArray = state.cartItems;
            for(let i=0;i<cartArray.length;i++){
                if(cartArray[i].title === product.title){
                    cartArray[i].quantity += 1;
                    state.cartItems = cartArray;
                    return;
                }
            }
            cartArray.push(product);
            state.cartItems = cartArray;
            
        },

        removeItems(state,action){
            //if the existing quantity is equal to 1 then remove the item from cart else decrease the qty by 1
            const product = action.payload;
            let cartItems = state.cartItems;
            if(product.quantity > 1){
                const index = cartItems.findIndex(item=>item.title===product.title);
                cartItems[index].quantity -= 1;
                state.cartItems = cartItems;
            }
            else
            {
                cartItems.splice(cartItems.indexOf(product), 1);
                state.cartItems = cartItems;
            }
        }
    }
});

//thunk to send cart data to the backend and update notification state
export const sendCartData = (cart)=>
    {
        return async(dispatch)=>{
             //set notification to sending request to the server
            dispatch(UiAction.showNotification({
                status : 'pending',
                title : 'Sending...',
                message : 'Sending cart data!'
            }))

                try
                {
                const res = await fetch('https://shopping-app-5eb89-default-rtdb.firebaseio.com/cart.json',
                {
                    method:'PUT',
                    body:JSON.stringify(cart),
                });

                if(!res.ok){
                  throw new Error('Sending cart data failed..!')
                }
                else{
                    //set notification requst successfully sent
                    dispatch(UiAction.showNotification({
                    status : 'success',
                    title : 'Success!',
                    message : 'Cart data sent successfully!'
                    }))      
                }
                }
                catch(error){
                  //set notification to request failed
                  dispatch(UiAction.showNotification({
                    status : 'error',
                    title : 'Error!',
                    message : 'Sending cart data failed!'
                }))
                }
    }
}

//thunk to get cart data from the backend and update notification state
export const getCartData=()=>{
    return async(dispatch)=>{
          //set notification to sending request to the server
          dispatch(UiAction.showNotification({
            status : 'pending',
            title : 'Fetching...',
            message : 'Fetching cart data!'
        }));
        try{
            const res = await fetch('https://shopping-app-5eb89-default-rtdb.firebaseio.com/cart.json');
            if(!res.ok){
                throw new Error('Fetching cart data failed!');
            }
            else{
                const items = await res.json();
                console.log(items);
                
                for(let i=0;i<items.length; i++){
                   console.log(items[i]); 
                   const product = {
                        title : items[i].title,
                        price : items[i].price,
                        description : items[i].description,
                        quantity : items[i].quantity
                      }
                      dispatch(cartSlice.actions.addItems(product));
                }
                
                    // const product = {
                    //     title : item.title,
                    //     price : item.price,
                    //     description : item.description,
                    //     quantity : item.quantity
                    //   }
                    //   dispatch(cartSlice.actions.addItems(product));
                
                dispatch(UiAction.showNotification({
                    status : 'success',
                    title : 'Success...',
                    message : 'Cart data fetched successfully!'
                }));
            }
        }
        catch(error){
            dispatch(UiAction.showNotification({
                status : 'error',
                title : 'Error...',
                message : 'Cart data could not be fetched!'
            })); 
        }
    }
}

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;

