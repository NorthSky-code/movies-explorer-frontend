import React from 'react';
import './MoviesCard.css';

function MoviesCard({ image, title, duration, isLiked, currentPage }) {

	return (
		<li className="card-movie">
			<img src={image} alt={title} className="card-movie__img" />
			<div className="card-movie__info">
				<div className="card-movie__text">
					<h2 className="card-movie__title">{title}</h2>
					{currentPage === "movies" ? (
						<button type="button" className={`card-movie__save ${isLiked ? "card-movie__save_active" : ""}`}></button>) : (
						<button type="button" className={`card-movie__button_delete`}></button>)}
				</div>
				<p className="card-movie__duration">{duration}</p>
			</div>
		</li >
	)
}

export default MoviesCard;