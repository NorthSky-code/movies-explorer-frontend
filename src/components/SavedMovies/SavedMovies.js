import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterSearch } from '../../utils/filterSearch';

function SavedMovies({ onBurgerIcon, loggedIn, isSavedMovies, onCardDelete, setIsSavedMovies }) {
	const [movies, setMovies] = useState(isSavedMovies);
	const [isErrorRequest, setIsErrorRequest] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [searchMovies, setSearchMovies] = useState(localStorage.getItem('searchMovies') || '');
	const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem('isShort')) || false);

	useEffect(() => {
		localStorage.setItem('isSavedMovies', JSON.stringify(isSavedMovies));
	}, [isSavedMovies]);

	useEffect(() => {
		const filteredMovies = filterSearch(isSavedMovies, searchMovies, isShortMovies);
		const notFound = filteredMovies.length === 0;
		setIsNotFound(notFound);
		setMovies(filteredMovies);
	}, [isSavedMovies, isShortMovies]);

	function handleSearchMovie(e) {
		const searchData = e.target.value;
		setSearchMovies(searchData);
		localStorage.setItem('searchMovies', searchData);
	}

	function handleFilterSearch(searchData) {
		if (searchData === '') {
			setIsNotFound(false);
		} else {
			const filteredMovies = filterSearch(isSavedMovies, searchData, isShortMovies);
			if (filteredMovies.length === 0) {
				setIsNotFound(true);
			} else {
				setIsNotFound(false);
			}
			setMovies(filteredMovies);
			localStorage.setItem('filteredSearchMovies', JSON.stringify(filteredMovies));
		}
	}

	function checkShortMovie(e) {
		const checked = e.target.checked;
		setIsShortMovies(checked);
		localStorage.setItem('isShort', JSON.stringify(checked));
	}

	function handleCardDelete(movie) {
		const updatedMovies = movies.filter((m) => m._id !== movie._id);
		setIsSavedMovies(updatedMovies);
		onCardDelete(movie);
	}

	return (
		<>
			<Header onBurgerIcon={onBurgerIcon} loggedIn={loggedIn} />
			<main>
				<section className="movies">
					<SearchForm
						handleSearchMovie={handleSearchMovie}
						handleFilterSearch={handleFilterSearch}
						checkShortMovie={checkShortMovie}
						searchMovies={searchMovies}
						isShortMovies={isShortMovies}
					/>
					<MoviesCardList
						movies={movies}
						isSavedMovies={isSavedMovies}
						isNotFound={isNotFound}
						isErrorRequest={isErrorRequest}
						onCardDelete={handleCardDelete}
					/>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default SavedMovies;