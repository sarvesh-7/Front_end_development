import Chart from '../Chart/Chart';
const ExpenseChart = props =>{
    //chart bar datapoints which will have total sum of expenses amount for each month in the filtered year
    const chartDataPoints = [
        {label : 'Jan', value : 0},
        {label : 'Feb', value : 0},
        {label : 'Mar', value : 0},
        {label : 'Apr', value : 0},
        {label : 'May', value : 0},
        {label : 'Jun', value : 0},
        {label : 'Jul', value : 0},
        {label : 'Aug', value : 0},
        {label : 'Sep', value : 0},
        {label : 'Oct', value : 0},
        {label : 'Nov', value : 0},
        {label : 'Dec', value : 0}
    ];
    //sum up the expenses of each month for the filtered year and update the value in above array
    for(let expense of props.expenses){
        const expMonth = expense.date.getMonth();
        chartDataPoints[expMonth].value += expense.amount;  
    }
return <Chart dataPoints = {chartDataPoints}/>;
}

export default ExpenseChart;