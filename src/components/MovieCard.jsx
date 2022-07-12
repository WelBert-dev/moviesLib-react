import { Link } from 'react-router-dom';

import { FaStar } from 'react-icons/fa';

const imageURL = import.meta.env.VITE_IMG;
 
function MovieCard(movie, showLink = true)
{
    return (
        <div className="movie-card">
            <img src={imageURL + movie.movie.poster_path} alt={movie.movie.title}/>
            <h2>{movie.movie.title}</h2>
            <p>
                <FaStar /> {movie.movie.vote_average}
            </p>
            {showLink && <Link to={`/movie/${movie.movie.id}`}>Detalhes</Link>}
        </div>
    );
}

export default MovieCard;
