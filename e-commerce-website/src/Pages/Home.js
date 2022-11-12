import React from 'react';
import Tours from './Tours';
import classes from './Home.module.css';
const Home = props=>{
    const tours = [
        {
            tourDate : 'JUL16',
            city : 'TORONTO, ON',
            location : 'BUDWEISER STAGE'
        },
        {
            tourDate : 'JUL19',
            city : 'DETROIT, MI',
            location : 'DTE ENERGY MUSIC THEATRE'
        },
        {
            tourDate : 'JUL22',
            city : 'BRISTOW, VA',
            location : 'JIGGY LUBE LIVE'
        },
        {
            tourDate : 'JUL29',
            city : 'PHOENIX, AZ',
            location : 'AK-CHIN PAVILION'
        },
        {
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
                <Tours tour={tour}/>
            ))
        }
        </div>
       </React.Fragment>
    );
 

};
export default Home;