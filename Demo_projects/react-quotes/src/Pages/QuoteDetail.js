import {useParams,Route, Link,useRouteMatch} from 'react-router-dom';
import React,{useEffect} from 'react';
import Comments from '../Components/comments/Comments';
import HighlightedQuote from '../Components/quotes/HighlightedQuote';
import LoadingSpinner from '../Components/UI/LoadingSpinner';
import {getSingleQuote} from '../lib/lib/api';
import useHttp from '../hooks/hooks/use-http';

const QuoteDetail= (props)=>{
const params = useParams();
const{quoteID} = params;

const match = useRouteMatch();
console.log('routermatch : ', match);

const {sendRequest, status, data : loadedQuote, error} = useHttp(getSingleQuote, true);
    useEffect(()=>{
        sendRequest(quoteID);
    }, [sendRequest,quoteID]);

    if(status==='pending'){
        return(
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        );
    }

    if(error){
    return <p className='centered focused'>{error}</p>
    }

    if(!loadedQuote.text){
        return <p className='centered focused'>No quotes found</p>
    }


// const quote = dummy_quotes.find(quote=> quote.id===params.quoteID);


// console.log('location' , useLocation());

return(<React.Fragment>
    <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
    <Route path={match.path} exact>
    <div className='centered'>
    <Link to={`${match.url}comments`} className='btn--flat'>Load Comments</Link>
    </div>
    </Route>
    <Route path={`${match.path}/comments`}>
    <Comments/>
    </Route>
    </React.Fragment>);
}
export default QuoteDetail;