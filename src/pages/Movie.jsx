import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';

import MovieCard from '../components/MovieCard';

import './Movie.css';

const moviesURL = import.meta.env.VITE_API_BASE;
const apiKey = import.meta.env.VITE_API_KEY;

function Movie()
{
    const {id} = useParams();
    const [movie, setMovie] = useState([]);

    const getMovie = async(url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovie(data);
    }

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`;
        getMovie(movieURL);

    }, []);

    return (
        <div className="SingleMovie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline}</p>
                    <div className="SingleInfo">
                        <h3>
                            <BsWallet2 />Orçamento
                        </h3>
                        <p>{formatCurrency(Number(movie.budget)) === '$0.00'? 'Sem informação': formatCurrency(Number(movie.budget))}</p>
                    </div>
                    <div className="SingleInfo">
                        <h3>
                            <BsGraphUp />Receita
                        </h3>
                        <p>{formatCurrency(Number(movie.revenue)) === '$0.00'? 'Sem informação': formatCurrency(Number(movie.revenue))}</p>
                    </div>
                    <div className="SingleInfo">
                        <h3>
                            <BsHourglassSplit />Duração
                        </h3>
                        <p>{movie.runtime} minutos</p>
                    </div>
                    <div className="SingleInfo description">
                        <h3>
                            <BsFillFileEarmarkTextFill />Descrição
                        </h3>
                        <p>{movie.overview}</p>
                    </div>
                    
                </> )
            }
        </div>
    );
}

export default Movie;