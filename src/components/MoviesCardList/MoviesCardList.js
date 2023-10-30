import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreMovies from '../MoreMovies/MoreMovies';


function MoviesCardList({ movies, countMovies, showMore, onCardLike, onCardDelete, savedMovies }) {

	const initialMovies = movies?.slice(0, countMovies);

	return (
		<section className="card-list">
			<ul className="card-list__movies">
				{initialMovies.map((movie) => (
					<MoviesCard
						key={movie.id || movie._id}
						movie={movie}
						allMovies={movies}
						onCardLike={onCardLike}
						onCardDelete={onCardDelete}
						savedMovies={savedMovies}
					/>
				))}
			</ul>
			<MoreMovies
				movies={movies}
				initialMovies={initialMovies}
				showMore={showMore}
			/>
		</section>
	);
}

export default MoviesCardList;
