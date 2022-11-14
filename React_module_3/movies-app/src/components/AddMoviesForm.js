import React,{useRef} from 'react';
import classes from './AddMoviesForm.module.css';
const AddMoviesForm = () => {
    const title = useRef();
    const opening_text = useRef();
    const Rel_date = useRef();

    const getMovieDataHandler = (e)=>{
        e.preventDefault();
        const movieObj = {
            title : title.current.value,
            openingText : opening_text.current.value,
            releaseDate : Rel_date.current.value
        }
        console.log(movieObj);
    }
    return (
        <form>
            <label forhtml='title'>Title</label>
            <input type='text' id='title' ref={title}/>
            <label forhtml='opening_text'>Opening Text</label>
            <textarea id='opening_text' ref={opening_text}/>
            <label forhtml='Rel_date'>Release Date</label>
            <input type='text' id='Rel_date' ref={Rel_date}/>
            <button type = 'submit' onClick={getMovieDataHandler}>Add Movie</button>
        </form>
    );
}

export default AddMoviesForm;
