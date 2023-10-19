import React, { useState } from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, onCardLike, onCardDelete, isSavedMovies }) {
	const [isLiked, setIsLiked] = useState(false);
	const { image, duration, nameRU, trailerLink } = movie;
	const imageCard = isSavedMovies ? image : `https://api.nomoreparties.co${image?.url}`;

	const formatTime = () => {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return `${hours} ч ${minutes} мин`;
	};

	const handleCardLike = () => {
		onCardLike(movie);
		setIsLiked(true);
	};

	const handleCardDelete = () => {
		onCardDelete(movie);
		setIsLiked(false);
	};

	const handleCardUnlike = () => {
		handleCardDelete();
	};


	return (
		<li className="card-movie">
			<a href={trailerLink} target="_blank" rel="noreferrer">
				<img src={imageCard} alt={nameRU} className="card-movie__img" />
			</a>
			<div className="card-movie__info">
				<div className="card-movie__text">
					<h2 className="card-movie__title">{nameRU}</h2>
					<button
						type="button"
						className={`card-movie__save ${isSavedMovies ? 'card-movie__button_delete' : isLiked ? 'card-movie__save_active' : ''}`}
						onClick={isSavedMovies ? handleCardDelete : !isLiked ? handleCardLike : handleCardUnlike}
					></button>
				</div>
				<p className="card-movie__duration">{formatTime()}</p>
			</div>
		</li>
	);
}

export default MoviesCard;