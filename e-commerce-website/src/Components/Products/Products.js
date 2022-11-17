import React from 'react';
import ProductsList from './ProductsList';
import classes from './Products.module.css';
import Button from '../UI/Button';

const Products = props=>{
     const productsArr = [
        {
        id: 'P1',
        title: 'Shoes',
        price: 100,
        imageUrl: '\\Assets\\Shoes\\shoes-main.webp',
        quantity:1
        },
        
        {
        id: 'P2',
        title: 'Smartwatch',
        price: 50,
        imageUrl: '\\Assets\\Watch\\watch-main.webp',
        quantity:1
        },
        
        {
        id: 'P3',
        title: 'Airpods',
        price: 70,
        imageUrl: '\\Assets\\Airpods\\Airpods-main.webp',
        quantity:1
        },
        
        {
        id: 'P4',
        title: 'Wallet',
        price: 20,
        imageUrl: '\\Assets\\Wallet\\wallet-main.webp',
        quantity:1
        }
        ];

        const ProductsComp = productsArr.map((product)=>{
            return <ProductsList key={product.id} product={product}/>
        })

        return(
            <React.Fragment>
            <div className={classes.products}>    
                {ProductsComp}  
            </div>
            <Button className={classes.showcart}>See the cart</Button>
            </React.Fragment>
        )
        
        
}
export default Products;