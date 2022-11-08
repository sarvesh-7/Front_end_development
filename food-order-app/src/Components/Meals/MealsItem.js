import classes from './MealsItem.module.css';
import AddMealsForm from './AddMealsForm';
import React from 'react';

const MealsItem = (props)=>{
    return(
        props.MealsArray.map((Meal)=>{
            return(
            <li key={Meal.id}>   
            <div className={classes.meals_item}>
                <div>
                <div className={classes.title}>{Meal.title}</div>
                <div className={classes.desc}>{Meal.desc}</div>
                <div className={classes.price}> ${Meal.price}</div>
                </div>
                <AddMealsForm meal = {Meal}/>  
            </div>
            <hr/>
            </li>
            )
        })
    )
}
export default React.memo(MealsItem);