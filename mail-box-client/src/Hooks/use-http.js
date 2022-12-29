import {useState,useCallback} from 'react';
import axios from 'axios';

const useHttp = ()=>{
    const[isLoading,setIsLoading] = useState();
    const[status,setStatus] = useState();

    const sendRequest = useCallback(async(requestConfig,applyData)=>{

        try{
            setIsLoading(true);
            setStatus(null);

            const res = await axios[requestConfig.type](requestConfig.URL,
            requestConfig.body ? requestConfig.body : {});
            if(!res.status===200){
                
                throw new Error();
            }
            console.log(res);
            if(applyData)
            applyData(res.data);
            setStatus('success');
        }
        catch(error){
            alert(error.message);
            setStatus('error');
        }
        setIsLoading(false);
    },[])
    return{
        isLoading,
        status,
        sendRequest
    };
};
export default useHttp;