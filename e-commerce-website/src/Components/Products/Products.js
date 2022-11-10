import React from 'react';
import ProductsList from './ProductsList';
import classes from './Products.module.css';
const Products = props=>{
     const productsArr = [
        {
        id: 'P1',
        title: 'Colors',
        price: 100,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
        quantity:1
        },
        
        {
        title: 'Black and white Colors',
        id: 'P2',
        price: 50,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
        quantity:1
        },
        
        {
        id: 'P3',
        title: 'Yellow and Black Colors',
        price: 70,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
        quantity:1
        },
        
        {
        id: 'P4',
        title: 'Blue Color',
        price: 100,
        imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
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
            <button className={classes.showcart}>See the cart</button>
            </React.Fragment>
        )
        
        
}
export default Products;