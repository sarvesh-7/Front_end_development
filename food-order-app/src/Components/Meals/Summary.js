import classes from './Summary.module.css';
import React from 'react';
//summary of the app
const Summary = () =>{
    return(
      <div className={classes.summary}>
          <h2>Delicious Food, Delivered To You!</h2>
          <p>
              Choose your favorite meal from our broad selection of available meals and enjoy
              a delicious lunch and dinner at home.</p>
          <p>
              All our meals are cooked withe high-quality ingredients,just in time and 
              ofcouse by experienced chefs!
          </p>
      </div>  
    )
};

export default React.memo(Summary);