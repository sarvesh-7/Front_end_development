import React, {useState,useEffect} from 'react';

import MoviesList from './components/MoviesList';
import AddMoviesForm from './components/AddMoviesForm';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    let id;

    const fetchMoviesHandler = async () => { // update state is loading
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            if (!response.ok) {
                throw new Error('Something went wrong.. Retrying');
            }
            const data = await response.json();

            const transformedMovieData = data.results.map((movieData) => {
                return {id: movieData.episode_id, title: movieData.title, openingText: movieData.opening_crawl, releaseDate: movieData.release_data};
            });
            setMovies(transformedMovieData);
        } catch (error) {
          console.log('I am called');
            setError(error.message);
        }
        // set isLoading to false once received data from back end
        setIsLoading(false);
    }

    if(error){
      id = setTimeout(fetchMoviesHandler, 5000);
    }

    const stopRetryingHanlder = ()=>{
      console.log("I am cleared");
      clearTimeout(id);
      setError(null);
    }

    useEffect(()=>{
        console.log('API call made in useEffect');
        fetchMoviesHandler()
    },[]);

    return (
        <React.Fragment>
            <section>
                <AddMoviesForm/>
            </section>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
                <button onClick={stopRetryingHanlder}>Stop Retrying</button>
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
