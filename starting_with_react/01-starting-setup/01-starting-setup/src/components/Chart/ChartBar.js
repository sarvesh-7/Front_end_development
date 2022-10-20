import './ChartBar.css';

const ChartBar = (props) => {

    //initial bar height for the chart bar
    let barFillHeight = '0%';

    //Calculate the height of the expense chart bar for the current component instance
    if (props.maxValue > 0) 
    {
        barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
    }
  
    return (
        <div className='chart-bar'>
            <div className='chart-bar__inner'>
                <div className='chart-bar__fill'
                    style={
                        { height: barFillHeight} //set chart bar height using css style
                }></div>
            </div>
            <div className='chart-bar__label'>
                {
                props.label //set chartbar label i.e month name
            } </div>
        </div>
    );
};

export default ChartBar;
