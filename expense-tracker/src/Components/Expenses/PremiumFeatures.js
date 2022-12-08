import Button from '../UI/Button';
import classes from './PremiumFeatures.module.css';
import {themeAction} from '../../store/Theme';
import { useDispatch,useSelector } from 'react-redux';
import {useState, Fragment, useEffect} from 'react';
import {premiumAction} from '../../store/Premium';

const PremiumFeatures = (props)=>{

    const dispatch = useDispatch();
    const [isPremium,setIsPremium] = useState(false);

    const makeCSV = (rows)=>{
        return rows.map(r=>r.join(',')).join('\n');
    }

    const expenseData = props.expenses.map((expense)=>{
        return [expense.amount, expense.description, expense.category];
    })

    const data = [['Amount', 'Description' , 'Category'],...expenseData];

    const blob = new Blob([makeCSV(data)]);

    console.log(isPremium);

    // useEffect(()=>{
    //     if(localStorage.getItem('premium_ac')==='true')
    //     setIsPremium(true);
    // },[]);
    

const onClickHandler = ()=>{ 
    localStorage.setItem('premium_ac', true);
    // dispatch(premiumAction.activatePremiumAc());
    setIsPremium(true);
}

const downloadFileHanlder = ()=>{

}

const changeThemeHandler = ()=>{
   dispatch(themeAction.toggleTheme()); 
};

    return(
        <Fragment>
        <Button className={classes.premium} type ='click' onClick={onClickHandler}>
            Activate Premium
        </Button>
        {
            isPremium && <a download = 'expense.csv' href = {URL.createObjectURL(blob)} type='click' onClick={downloadFileHanlder}>
                Download CSV file 
                </a>
        }
        {
            isPremium && <Button className={classes.premium} type='click' onClick={changeThemeHandler}>
                Toggle theme
                </Button>
        }

        </Fragment>
    );
};
export default PremiumFeatures;