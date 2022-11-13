import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const[isLoading, setIsLoading] = useState(false);

 const fetchMoviesHandler = async()=>{

  //update state is loading
  setIsLoading(true);
   const response = await fetch('https://swapi.dev/api/films/')
   const data = await response.json();

     const transformedMovieData = data.results.map((movieData)=>{
       return {
         id : movieData.episode_id,
         title : movieData.title,
         openingText : movieData.opening_crawl,
         releaseDate : movieData.release_data
       };
     });
    setMovies(transformedMovieData);

    //set isLoading to false once received data from back end
   setIsLoading(false);
   }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      {isLoading && 
      <section>
        <h2>Data is Loading...</h2>
      </section>
      }
      {
        !isLoading && movies.length > 0&&
        <section>
        <MoviesList movies={movies} />
      </section>
      }
      
    </React.Fragment>
  );
}

export default App;
