import React from 'react';
import classes from './Tours.module.css';
const Tours = (props)=>{
    return (
    <div className={classes.tours}>
        <span>{props.tour.tourDate}</span>
        <span>{props.tour.city}</span>
        <span>{props.tour.location}</span>
        <button>Buy Tickets</button>
    </div>
    )
};
export default Tours;