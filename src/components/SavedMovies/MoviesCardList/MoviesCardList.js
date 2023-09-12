import React from 'react';
import '../../Movies/MoviesCardList/MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard.js';
import moviesArray from '../../../utils/MoviesArray.js';

function MoviesCardList() {
	const likedMovies = moviesArray.filter((movie) => movie.isLiked);
	const selectedMovies = likedMovies.slice(0, 3);

	return (
		<section className="card-list">
			<ul className="card-list__movies">
				{selectedMovies.map((movie, i) => (
					<li key={i}>
						<MoviesCard
							image={movie.image}
							title={movie.title}
							duration={movie.duration}
							isLiked={movie.isLiked}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}

export default MoviesCardList;