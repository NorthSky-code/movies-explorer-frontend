import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardListSave from '../MoviesCardListSave/MoviesCardListSave';

function SavedMovies() {
	return (
		<main>
			<section className="movies">
				<SearchForm />
				<MoviesCardListSave />
			</section>
		</main>
	)
}

export default SavedMovies;