import ExpContext from './ExpContext';
import {useState,useEffect} from 'react';
import axios from 'axios';

const ExpContextProvider = (props)=>{

    const[expList, setExpList] = useState([]);

    //firebase database URL path
    const url = 'https://expense-tracker-d3062-default-rtdb.firebaseio.com';

    //get expense details from database after every page refresh
    useEffect(()=>{
        const getExpenses = async()=>{
            const res = await axios.get(`${url}/expense.json`);
            if(res.status===200)
            {
                const data = res.data;
                let exp_list = [];
                for(const key in data)
                {
                   const expObj = {
                        id : key,
                        amount : data[key].amount,
                        description : data[key].description,
                        category : data[key].category 
                    }
                 exp_list.push(expObj);
                } 
                setExpList(exp_list);       
            }
            else
            {
                alert('could not fetch data from database due to some technical error');
            }
        }
        getExpenses();
    }, []);

    //add expenses
    const addExpense=async(expense)=>{

         //update expense details into firebase database
         const res = await axios.post(`${url}/expense.json`, expense);
         console.log('res', res);
         if(res.status===200){
             alert('Expense stored in database successfully');
             setExpList((expList)=>[...expList,  expense]);
         }
         else{
             alert('Error while storing expense details ');
         }
    }

    const removeExpense=(id)=>{};

    const expCtx = {
        expenseList : expList,
        addExpense : addExpense,
        removeExpense : removeExpense
    }

    return(
        <ExpContext.Provider value={expCtx}>{props.children}</ExpContext.Provider>
    )

}
export default ExpContextProvider;