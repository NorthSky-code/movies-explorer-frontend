import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreMovies from '../MoreMovies/MoreMovies';
import Preloader from '../Preloader/Preloader';
import { notFoundMessage, errorRequestMessage } from '../../utils/constants';

function MoviesCardList({ isLoading, isNotFound, isErrorRequest, movies, countMovies, showMore, onCardLike, onCardDelete, isSavedMovies }) {

	const initialMovies = movies.slice(0, countMovies);

	return (
		<section className="card-list">
			{isLoading ? (
				<Preloader />
			) : (
				<div>
					{isNotFound ? (
						<p className="card-list__message">{notFoundMessage}</p>
					) : isErrorRequest ? (
						<p className="card-list__message">{errorRequestMessage}</p>
					) : (
						<ul className="card-list__movies">
							{initialMovies.map((movie) => (
								<MoviesCard
									key={movie.id || movie._id}
									movie={movie}
									onCardLike={onCardLike}
									onCardDelete={onCardDelete}
									isSavedMovies={isSavedMovies}
								/>
							))}
						</ul>
					)}
				</div>
			)}
			<MoreMovies
				movies={movies}
				initialMovies={initialMovies}
				showMore={showMore}
			/>
		</section>
	);
}

export default MoviesCardList;