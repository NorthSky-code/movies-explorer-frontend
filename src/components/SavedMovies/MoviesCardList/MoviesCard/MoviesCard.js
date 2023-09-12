import React from 'react';
import '../../../Movies/MoviesCardList/MoviesCard/MoviesCard.css';

function MoviesCard({ image, title, duration, isLiked }) {

	return (
		<li className="card-movie">
			<img src={image} alt={title} className="card-movie__img" />
			<div className="card-movie__info">
				<div className="card-movie__text">
					<h3 className="card-movie__title">{title}</h3>
					<button type="button" className={`card-movie__save ${isLiked ? "card-movie__button_delete" : ""}`}></button>
				</div>
				<p className="card-movie__duration">{duration}</p>
			</div>
		</li>
	)
}

export default MoviesCard;