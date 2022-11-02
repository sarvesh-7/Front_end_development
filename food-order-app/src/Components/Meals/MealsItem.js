import classes from './MealsItem.module.css';
const MealsItem = (props)=>{

    return(
        props.MealsArray.map((Meal)=>{
            return(
            <div>
                <li className={classes.title}>{Meal.title}</li>
                <li className={classes.desc}>{Meal.desc}</li>
                <li className={classes.price}> ${Meal.price}</li>
                <hr/>  
            </div>
            )
        })
    )
}
export default MealsItem;