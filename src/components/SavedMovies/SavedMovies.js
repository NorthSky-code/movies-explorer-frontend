import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js'

function SavedMovies() {
	return (
		<section className="movies">
			<SearchForm />
			<MoviesCardList />
		</section>
	)
}

export default SavedMovies;