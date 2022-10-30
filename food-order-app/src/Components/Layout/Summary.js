import classes from './Summary.module.css';
const Summary = () =>{
    return(
      <div className={classes.summary}>
          <h1>Delicious Food, Delivered To You!</h1>
          <h5>
              Choose your favorite meal from our broad selection of available meals and enjoy
              a delicious lunch and dinner at home.<br/><br/>
              All our meals are cooked withe high-quality ingredients,just in time and 
              ofcouse by experienced chefs!
          </h5>
      </div>  
    )
};

export default Summary;