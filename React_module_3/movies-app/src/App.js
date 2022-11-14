import React, {useState,useEffect,useCallback} from 'react';
import Button from './components/UI/Button';
import MoviesList from './components/MoviesList';
import AddMoviesForm from './components/AddMoviesForm';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    let id;
    let loadedMovieData = [];

    const fetchMoviesHandler = useCallback(async () => { // update state isLoading and clear error state
        setIsLoading(true);
        setError(null);
        //fetch movie data from firebase
        try {
            const response = await fetch('https://movies-app-bc878-default-rtdb.firebaseio.com/Movies.json');
            if (!response.ok) {
                throw new Error('Something went wrong.. Retrying');
            }
            const data = await response.json(); //convert movie data from JSON to javascript object

            loadedMovieData = []; //set initial loaded data as empty

            //load all movie data fetched from API to an array
            for(const key in data){
                loadedMovieData.push({
                    id : key,
                    title : data[key].title,
                    openingText : data[key].openingText,
                    releaseDate : data[key].releaseDate
                });
            }
            //update movie data in state to render on screen
            setMovies(loadedMovieData);

        } catch (error) {
            setError(error.message);
        }
        // set isLoading to false once received data from back end
        setIsLoading(false);
    },[]);

    //if there is an error make request to the API repeatedly in every 5 sec
    if(error){
      id = setTimeout(fetchMoviesHandler, 5000);
    }

    //stop retrying again and again once clicked on stop retrying button
    const stopRetryingHanlder = useCallback(()=>{
      console.log("I am cleared");
      clearTimeout(id);
      setError(null);
    },[id]);

    //fetch all movie data when dom content loaded
    useEffect(()=>{
        console.log('API call made in useEffect');
        fetchMoviesHandler()
    },[]);

    //add movie data to the backend
    const addMovies = useCallback(async (movie)=>{
        try
        {
            const response  = await fetch('https://movies-app-bc878-default-rtdb.firebaseio.com/Movies.json',
        {
            method : 'POST',
            body : JSON.stringify(movie),
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        const data = await response.json();
        //update movie ID receievd from Backend and update movie state
        movie.id = data.name;
        setMovies((movies)=> [...movies, movie]);
        }
        catch(error)
        {
            setError(error.message);
        }
        
    },[]);

    //delete movie data from backend
    const deleteMovie = useCallback(async (title)=>{
        let id;
        let elementToBeDeleted;
        console.log('movies before loop', movies);
        for(let i=0; i<movies.length;i++)
        {
            if(movies[i].title === title)
            {
                elementToBeDeleted = i;
                id = movies[i].id;
                break;
            }
        }
        try
        {
            const response = await fetch(`https://movies-app-bc878-default-rtdb.firebaseio.com/Movies/${id}.json`,
        {
            method : 'DELETE',
            body: null,
            headers:{
                'Content-Type' : 'application/json'
            }

        });
        // remove deleted element from movie array and update the state
        movies.splice(elementToBeDeleted, 1);
        setMovies([...movies]);
        }
        catch(error){
            setError(error.message);
        }
    });

    return (
        <React.Fragment>
            <section>
                <AddMoviesForm addMovies = {addMovies} deleteMovie = {deleteMovie} />
            </section>
            <section>
                <Button onClick={fetchMoviesHandler}>Fetch Movies</Button>
                <Button onClick={stopRetryingHanlder}>Stop Retrying</Button>
            </section>
            {
            isLoading && <section>
                <h2>Data is Loading...</h2>
            </section>
        }
            {
            !isLoading && error && <section>
                <p>{error}</p>
            </section>
        }
            {
            !isLoading && movies.length > 0 && <section>
                <MoviesList movies={movies}/>
            </section>
        } </React.Fragment>
    );
}

export default App;
