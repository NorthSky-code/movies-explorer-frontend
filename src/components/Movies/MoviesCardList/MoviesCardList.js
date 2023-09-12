import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import MoreMovies from '../MoreMovies/MoreMovies';
import moviesArray from '../../../utils/MoviesArray';
import Preloader from '../Preloader/Preloader';

function MoviesCardList() {

	const [isLoading, setIsLoading] = useState(false);

	return (
		<section className="card-list">
			{isLoading ? (
				<Preloader />
			) : (
				<ul className="card-list__movies">
					{moviesArray.map((movie, i) => (
						<MoviesCard key={i}
							image={movie.image}
							title={movie.title}
							duration={movie.duration}
							isLiked={movie.isLiked}
						/>
					))}
				</ul>
			)}
			<MoreMovies />
		</section>
	);
}

export default MoviesCardList;