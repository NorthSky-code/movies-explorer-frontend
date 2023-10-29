import React, {useState, useEffect} from 'react';
import './MoviesCard.css';
import {useLocation} from "react-router-dom";

function MoviesCard({movie, onCardLike, onCardDelete, savedMovies, allMovies}) {
  const location = useLocation()
  const isSavedMoviesPage = location.pathname === '/saved-movies'
  const {image, duration, nameRU, trailerLink, movieId} = movie;

  const trailerLinkCard = `https://api.nomoreparties.co${trailerLink?.url}`
  const savedMoviesIds = savedMovies.map(movie => movie.movieId)
  const isLiked = savedMoviesIds.includes(movieId)

  const movieIdDb = savedMovies.find(movie => movie.movieId === movieId)?._id

  const formatTime = () => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} ч ${minutes} мин`;
  };

  const handleCardLike = () => {
    onCardLike(movie);
  };

  const handleCardDelete = () => {
    onCardDelete(movieIdDb);
  };


  return (
    <li className="card-movie">
      <a href={trailerLinkCard} target="_blank" rel="noreferrer">
        <img src={image} alt={nameRU} className="card-movie__img"/>
      </a>
      <div className="card-movie__info">
        <div className="card-movie__text">
          <h2 className="card-movie__title">{nameRU}</h2>
          {isSavedMoviesPage
            ? (
              <button
                type="button"
                className='card-movie__save card-movie__button_delete'
                onClick={handleCardDelete}
              />
            )
            : (<button
              type="button"
              className={`card-movie__save ${isLiked ? 'card-movie__save_active' : ''}`}
              onClick={isLiked ? handleCardDelete : handleCardLike}
            />)}
        </div>
        <p className="card-movie__duration">{formatTime()}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
