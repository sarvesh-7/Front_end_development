import classes from './MealsItem.module.css';
import AddItems from './AddItems';
const MealsItem = (props)=>{

    return(
        props.MealsArray.map((Meal)=>{
            return(
            <li>   
            <div className={classes.meals_item}>
                <div>
                <div className={classes.title}>{Meal.title}</div>
                <div className={classes.desc}>{Meal.desc}</div>
                <div className={classes.price}> ${Meal.price}</div>
                </div>
                <AddItems meal = {Meal}/>  
            </div>
            <hr/>
            </li>
            )
        })
    )
}
export default MealsItem;