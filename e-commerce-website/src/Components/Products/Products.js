import React,{useState} from 'react';
import ProductsList from './ProductsList';
import classes from './Products.module.css';
import Button from '../UI/Button';
import Cart from '../Cart/Cart';


const Products = props=>{

    const [isCartOpen,setIsCartOpen] = useState(false);

    const showCartHandler = (e) =>{
        setIsCartOpen(true);
    }
    
    const hideCartHandler = (e) =>{
        setIsCartOpen(false);
    }

     const productsArr = [
        {
        key: 'P1',
        title: 'Shoes',
        price: 100,
        imageUrl: '\\Assets\\Shoes\\shoes-main.webp',
        quantity:1
        },
        
        {
        key: 'P2',
        title: 'Smartwatch',
        price: 50,
        imageUrl: '\\Assets\\Watch\\watch-main.webp',
        quantity:1
        },
        
        {
        key: 'P3',
        title: 'Airpods',
        price: 70,
        imageUrl: '\\Assets\\Airpods\\Airpods-main.webp',
        quantity:1
        },
        
        {
        key: 'P4',
        title: 'Wallet',
        price: 20,
        imageUrl: '\\Assets\\Wallet\\wallet-main.webp',
        quantity:1
        }
        ];

        const ProductsComp = productsArr.map((product)=>{
            return <ProductsList key={product.key} product={product}/>
        })

        return(
            <React.Fragment>
            <div className={classes.products}>    
                {ProductsComp}  
            </div>
            <Button className={classes.showcart} onClick={showCartHandler}>See the cart</Button>
            {isCartOpen && <Cart onHideCart = {hideCartHandler} />}
            </React.Fragment>
        )
        
        
}
export default Products;