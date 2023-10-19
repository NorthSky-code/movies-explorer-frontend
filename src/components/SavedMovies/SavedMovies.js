import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterSearch } from '../../utils/filterSearch';

function SavedMovies({ onBurgerIcon, loggedIn, isSavedMovies, onCardDelete }) {
	const [movies, setMovies] = useState(isSavedMovies);
	const [isNotFound, setIsNotFound] = useState(false);
	const [isErrorRequest, setIsErrorRequest] = useState(false);
	const [searchMovies, setSearchMovies] = useState(localStorage.getItem('searchMovies') || '');
	const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem('isShort')) || false);

	useEffect(() => {
		setMovies(isSavedMovies);
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
		handleFilterSearch(searchMovies);
		localStorage.setItem('isShort', checked);
	}

	return (
		<>
			<Header
				onBurgerIcon={onBurgerIcon}
				loggedIn={loggedIn}
			/>
			<main>
				<section className="movies">
					<SearchForm
						handleSearchMovie={handleSearchMovie}
						handleFilterSearch={handleFilterSearch}
						searchMovies={searchMovies}
						checkShortMovie={checkShortMovie}
						isShortMovies={isShortMovies}
						isSavedMovies={isSavedMovies}
					/>
					<MoviesCardList
						isSavedMovies={isSavedMovies}
						movies={movies}
						isNotFound={isNotFound}
						isErrorRequest={isErrorRequest}
						onCardDelete={onCardDelete}
					/>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default SavedMovies;
