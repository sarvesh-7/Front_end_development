import Button from '../UI/Button';
import classes from './PremiumFeatures.module.css';
import {themeAction} from '../../store/Theme';
import { useDispatch,useSelector } from 'react-redux';
import {useState, Fragment, useEffect} from 'react';
import {premiumAction} from '../../store/Premium';


const PremiumFeatures = (props)=>{

    const dispatch = useDispatch();
    // const [isPremium,setIsPremium] = useState(false);
    const isPremium = useSelector((state)=>state.premium.isPremiumAc);

    const makeCSV = (rows)=>{
        return rows.map(r=>r.join(',')).join('\n');
    }

    const expenseData = props.expenses.map((expense)=>{
        return [expense.amount, expense.description, expense.category];
    })

    const data = [['Amount', 'Description' , 'Category'],...expenseData];

    const blob = new Blob([makeCSV(data)]);

    useEffect(()=>{
        if(localStorage.getItem('premium_ac')==='true')
        {
            dispatch(premiumAction.activatePremiumAc());
        }  
    },[dispatch]);
    

const onClickHandler = ()=>{ 
    if(isPremium){
        
        localStorage.setItem('premium_ac', false);
        dispatch(premiumAction.deactivatePremiumAc());
        dispatch(themeAction.offTheme());  
    }
    else{
        localStorage.setItem('premium_ac', true);
        dispatch(premiumAction.activatePremiumAc()); 
    }
    console.log(isPremium);
    // setIsPremium(true);
}


const changeThemeHandler = ()=>{
   dispatch(themeAction.toggleTheme()); 
};

    return(
        <Fragment>
        {!isPremium && <Button className={classes.premium} type ='click' onClick={onClickHandler}>
            Activate Premium 
            </Button>
        }
        {
        isPremium && 
        <Button className={classes.premium} type ='click' onClick={onClickHandler}>
            Deactivate Premium 
        </Button>
        }
        {
            isPremium && <a download = 'expense.csv' href = {URL.createObjectURL(blob)} type='click'>
               <Button className={classes.premium} type ='click'> 
               <i class="fa fa-download"></i> {}
               Download expense report
               </Button>
                </a>
        }
        {
            isPremium && <Button className={classes.premium} type='click' onClick={changeThemeHandler}>
                <i class="fa fa-toggle-on"></i>{}Change theme
                </Button>
        }

        </Fragment>
    );
};
export default PremiumFeatures;