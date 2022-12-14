import MealsItem from './MealsItem';
import classes from './Meals.module.css';
import Card from '../UI/Card';
import React from 'react';

const Meals = ()=>{
    const MealsArray = [ {
        id : 'M1',
        title : 'Sushi',
        desc : 'Finest fish and veggies',
        price : 22.50
    },
    {
        id : 'M2',
        title : 'Schnitzel',
        desc : 'A german speciality',
        price : 16.50
    },
    {
        id : 'M3',
        title : 'Barbeque Burger',
        desc : 'American , raw and meaty',
        price : 12
    },
    {
        id : 'M4',
        title : 'Green Bowl',
        desc : 'Healthy and green',
        price : 15
    }];


    return(
        <Card className = {classes.meals_card}>
            <ul>
            <MealsItem MealsArray = {MealsArray}/>
            </ul>
        </Card>
     );
}
export default React.memo(Meals);