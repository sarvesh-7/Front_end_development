import './Chart.css';
import ChartBar from './ChartBar.js';

const Chart = (props) => {

    //find biggest expense amount across all the months in a year
    const ExpAmtArray = props.dataPoints.map(datapoint=>datapoint.value);
    const totalMaximum =  Math.max(...ExpAmtArray);

    return (
    <div className='chart'>
        {
        props.dataPoints.map((datapoint) => {
           return <ChartBar
                key={datapoint.label}
                value={datapoint.value}
                maxValue={totalMaximum}
                label={datapoint.label} />
        })
    } 
    </div>
    )
}

export default Chart;
