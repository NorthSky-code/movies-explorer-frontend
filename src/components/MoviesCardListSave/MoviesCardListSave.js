import React, { useState } from 'react';
import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesArray from '../../utils/MoviesArray';
import Preloader from '../Preloader/Preloader';

function MoviesCardListSave() {
	const likedMovies = moviesArray.filter((movie) => movie.isLiked);
	const selectedMovies = likedMovies.slice(0, 3);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<section className="card-list">
			{isLoading ? (
				<Preloader />
			) : (
				<ul className="card-list__movies card-list__movies-save">
					{selectedMovies.map((movie, i) => (
						<MoviesCard key={i}
							image={movie.image}
							title={movie.title}
							duration={movie.duration}
							isLiked={movie.isLiked}
						/>
					))}
				</ul>
			)}
		</section>
	);
}

export default MoviesCardListSave;