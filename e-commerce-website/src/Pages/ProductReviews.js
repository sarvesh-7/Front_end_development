import React from 'react';
import classes from './ProductReviews.module.css';
const ProductReviews = props => {
    const reviewsData = [
        {
            rating : 4,
            description : 'Nice product',
            user : 'Sarvesh Gawade',
            date : '2022-09-10'
        },
        {
            rating : 5,
            description : 'Nice quality',
            user : 'Prasad Jadhav',
            date : '2022-09-20'
        },
        {
            rating : 3,
            description : 'Good Packaging',
            user : 'Mayur Bhujbal',
            date : '2022-09-18'
        }
    ];
    const rating = reviewsData.map((review)=>{
        return <div className={classes.comments}>
        <div>
            <span className={classes.rating}>
            <span>{review.rating}</span>
            <span class="fa fa-star"></span>
            </span>
            {review.description}
        </div>
        <div className={classes.user}>
            <span>{review.user} {review.date}</span>
        </div>
        </div>

    })
    return (
        <div className={classes.reviews}>
            <h2>Rating and Reviews</h2>
            {rating}    
        </div>
    )
};
export default ProductReviews;
