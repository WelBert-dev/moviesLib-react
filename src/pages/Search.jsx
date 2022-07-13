import React from 'react';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import MovieCard from '../components/MovieCard';

import './MoviesGrid.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY; 

function Search()
{
    const [searchParams] = useSearchParams(); // retorno: array de funções, envolvendo em um array faz a desestruturação e evita erro
    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results);
    }

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=pt-BR`;

        getSearchedMovies(searchWithQueryURL);
    }, [query]);

    return (
        <div className="container-topRatedMovies">
            <h2 className="titleH2">Resultados para: <span className="query-text">{query}</span></h2>
            <div className="movies-container">
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} showLink={true}/>)}
            </div>

        </div>
    );
}

export default Search;