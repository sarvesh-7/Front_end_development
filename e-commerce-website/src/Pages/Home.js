import React from 'react';
import Tours from './Tours';
import classes from './Home.module.css';
const Home = props=>{
    const tours = [
        {
            id : 't1',
            tourDate : 'JUL16',
            city : 'TORONTO, ON',
            location : 'BUDWEISER STAGE'
        },
        {
            id : 't2',
            tourDate : 'JUL19',
            city : 'DETROIT, MI',
            location : 'DTE ENERGY MUSIC THEATRE'
        },
        {
            id : 't3',
            tourDate : 'JUL22',
            city : 'BRISTOW, VA',
            location : 'JIGGY LUBE LIVE'
        },
        {
            id : 't4',
            tourDate : 'JUL29',
            city : 'PHOENIX, AZ',
            location : 'AK-CHIN PAVILION'
        },
        {
            id : 't5',
            tourDate : 'AUG2',
            city : 'LAS VEGAS, NV',
            location : 'T-MOBILE ARENA'
        },

    ]
   return( 
       <React.Fragment>
        <h2>Tours</h2>
       <div className={classes.tours}>
        {
            tours.map((tour)=>(
                <Tours key={tour.id} tour={tour}/>
            ))
        }
        </div>
       </React.Fragment>
    );
 

};
export default Home;