import {createSlice,current} from '@reduxjs/toolkit';

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

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;

