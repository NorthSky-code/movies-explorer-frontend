import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';

function Movies() {
	return (
		<main>
			<section className="movies">
				<SearchForm />
				<MoviesCardList />
			</section>
		</main>
	)
}

export default Movies;