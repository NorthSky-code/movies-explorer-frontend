import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

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