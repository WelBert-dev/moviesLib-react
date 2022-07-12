import {useState, useEffect} from 'react';
import MovieCard from '../components/MovieCard';

import './MoviesGrid.css';

const moviesURL = import.meta.env.VITE_API_BASE;
const apiKey = import.meta.env.VITE_API_KEY;


function Home()
{
    console.log(moviesURL, apiKey);

    const [topMovies, setTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setTopMovies(data.results);
    }

    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?${apiKey}`;

        getTopRatedMovies(topRatedURL);
    }, []);

    return (
        <div className="container-topRatedMovies">
            <h2 className="titleH2">Melhores Filmes:</h2>
            <div className="movies-container">
             {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>

        </div>
    );
}

export default Home;