import React,{useRef} from 'react';
import classes from './AddMoviesForm.module.css';
import Button from './UI/Button';
const AddMoviesForm = (props) => {
    const title = useRef();
    const opening_text = useRef();
    const Rel_date = useRef();

    console.log("I am called in AddmoviesForm");

    const getMovieDataHandler = (e)=>{
        e.preventDefault();
        const movieObj = {
            title : title.current.value,
            openingText : opening_text.current.value,
            releaseDate : Rel_date.current.value
        }
        props.addMovies(movieObj);
    }

    const deleteMovieHandler = (e)=>{
        e.preventDefault();
        props.deleteMovie(title.current.value);
    }
    return (
        <form>
            <label forhtml='title'>Title</label>
            <input type='text' id='title' ref={title}/>
            <label forhtml='opening_text'>Opening Text</label>
            <textarea id='opening_text' ref={opening_text}/>
            <label forhtml='Rel_date'>Release Date</label>
            <input type='text' id='Rel_date' ref={Rel_date}/>
            <Button type = 'submit' onClick={getMovieDataHandler}>Add Movie</Button>
            <Button onClick={deleteMovieHandler}>Delete Movie</Button>
        </form>
    );
}

export default React.memo(AddMoviesForm);
