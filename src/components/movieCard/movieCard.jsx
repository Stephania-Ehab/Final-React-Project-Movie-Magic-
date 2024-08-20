import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './moviecard.css'; 

function MovieCard({ movie }) {
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
   const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
   const isInWatchlist = watchlist.some((item) => item.id === movie.id);
   setInWatchlist(isInWatchlist);
 }, [movie.id]);


 const toggleWatchlist = () => {
   let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

   if (inWatchlist) {
     watchlist = watchlist.filter((item) => item.id !== movie.id);
     setInWatchlist(false);
   } else {
     watchlist.push(movie);
      setInWatchlist(true);
    }

    

    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  };

  return (
    <div className="movie-card">
      <Link key={movie.id} to={`/movie/${movie.id}`}>
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      </Link>
      <div className="movie-info">
        <div className="movie-rating">{movie.vote_average}</div>
        <h3>{movie.title}</h3>
        <p>{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
        <button
            className={`heart ${inWatchlist ? 'in-watchlist' : ''}`}
            onClick={toggleWatchlist}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.413.878 1.4 3.053c-.523 1.12-.641 2.87.314 4.385.92 1.458 2.534 3.04 5.286 5.592 2.752-2.552 4.367-4.134 5.286-5.592.955-1.515.838-3.266.314-4.385C13.586.878 10.4.28 8.717 2.011L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              />
            </svg>
          </button>
      </div>
    </div>
  );
}

export default MovieCard;


