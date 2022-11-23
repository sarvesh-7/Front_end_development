import CartContext from './CartContext';
import {useState,useEffect} from 'react';
import axios from 'axios';

const ContextProvider = props=>{

    const [items,updateItems] = useState([]); //state to update cart items
    const authToken = localStorage.getItem('AUTH_TOKEN');
    const [token,setToken] = useState(authToken);
    let totalAmount = 0; //total cart amount
    
    const authEmail = localStorage.getItem('USER_EMAIL');
    const[email,setEmail] = useState(authEmail);

    let baseURL = `https://crudcrud.com/api/2bc73be568404a4888159049fbf5379d/${email}`;

    //load cart items when user logins or refreshes the page
    useEffect(()=>{
        async function getItems(){
            try{
                const res = await axios.get(baseURL);
                console.log(res.data);
                if(res.data){
                    // console.log(cartData);
                    updateItems([...res.data]);
                }
            }
            catch(error){
                console.log(error);
            }
            
        }
      getItems(); 
    },[email]);

    //calculate total cart amount by adding each item quantity * item price
    for(let i=0; i<items.length; i++){
        totalAmount += +(items[i].quantity * items[i].price).toFixed(2); 
    }

    //add products/change qty of existing products to the cart
    const addItem = async(item)=>{

        for(let i=0;i<items.length; i++){

            //change qty of existing product using put request
            if(items[i].title === item.title){
                //max qauntity = 5
                if(items[i].quantity < 5){
                    items[i].quantity += 1; 
                    console.log(items[i]);
                    const updatedItem =
                    {
                        key: items[i].key,
                        title: items[i].title,
                        price: items[i].price,
                        imageUrl: items[i].imageUrl,
                        quantity:items[i].quantity
                    }
                    try{
                        await axios.put(`${baseURL}/${items[i]._id}`, updatedItem);
                    }
                    catch(error){
                        console.log(error);
                    }
                    updateItems([...items]);
                    return true;
                }
                else{
                    return false;
                }   
            }
        }
    //add new product using post request
    try{
        const res = await axios.post(baseURL,item );
        console.log(res.data);
        const new_item = res.data;
        updateItems((items)=> [...items,new_item]);
    }
    catch(error){
        console.log(error);
    }
    }

    //remove product/decrease qty of existing product from cart
    const removeItem = async(itemToBeChanged)=>{
      try{
        if(itemToBeChanged.quantity>1){
            const index = items.indexOf(itemToBeChanged);
            items[ index ].quantity -= 1;
            const updatedItem =
            {
                key: items[ index ].key,
                title: items[ index ].title,
                price: items[ index ].price,
                imageUrl: items[ index ].imageUrl,
                quantity:items[ index ].quantity
            }
                const res = await axios.put(`${baseURL}/${items[ index ]._id}`, updatedItem);
                updateItems([...items]);
           
        }
        else{
            items.splice(items.indexOf(itemToBeChanged),1);
            const res = await axios.delete(`${baseURL}/${itemToBeChanged._id}`);
            updateItems([...items]);
        }
    }
        catch(error){
            console.log(error);
        }
        
    };

    //update user token after login and logout
    const updateToken = (token)=>{
        localStorage.setItem('AUTH_TOKEN', token);
        setToken(token);
    }

        //update user email id
        const updateEmail = (userEmail)=>{
            const convertedEmail = userEmail.replace(/['@.']/g,'');
            console.log('converted email', convertedEmail);
            localStorage.setItem('USER_EMAIL', convertedEmail);
            setEmail(convertedEmail);
        }

        //context object which contains all cart items and functions to add/remove cart items
        const CartCtx = {
            cartItems : items,
            amount : totalAmount,
            addItem : addItem,
            removeItem : removeItem,
            token : token,
            updateToken : updateToken,
            updateEmail : updateEmail,
            email : email
        }

    return (<CartContext.Provider value={CartCtx}>
        {props.children}
    </CartContext.Provider>);
}
export default ContextProvider;