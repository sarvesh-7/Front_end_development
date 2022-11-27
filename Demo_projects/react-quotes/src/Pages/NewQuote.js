import QuoteForm from '../Components/quotes/QuoteForm';
import {useHistory} from 'react-router-dom';
import useHttp from '../hooks/hooks/use-http';
import {addQuote} from '../lib/lib/api';
import {useEffect} from 'react';


const NewQuotes = (props)=>{

    const history = useHistory();
    const {sendRequest, status} = useHttp(addQuote);

    useEffect(()=>{
        if(status==='completed'){
            history.push('/quotes');
        }
    },[history,status]);

    const addQuoteHandler = quoteData =>{
        sendRequest(quoteData);
        // console.log(quoteData);
        // history.push('/quotes');
    }
    return <QuoteForm isLoading={status==='pending'} onAddQuote = {addQuoteHandler}/>
}
export default NewQuotes;