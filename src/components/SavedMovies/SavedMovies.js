import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterSearch } from '../../utils/filterSearch';
import Preloader from '../Preloader/Preloader';
import { NOT_FOUND_MESSAGE, ERROR_REQUEST_MESSAGE } from '../../utils/constants';

function SavedMovies({ onBurgerIcon, loggedIn, onCardDelete, savedMovies, setSavedMovies }) {
	const [viewMoviesSaved, setViewMoviesSaved] = useState(savedMovies);
	const [isErrorRequest, setIsErrorRequest] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [searchSavedMovies, setSearchSavedMovies] = useState(localStorage.getItem('searchSavedMovies') || '');
	const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem('isShortSaved')) || false);

	useEffect(() => {
		setViewMoviesSaved(savedMovies);
	}, [savedMovies, setViewMoviesSaved]);

	useEffect(() => {
		const filteredMovies = filterSearch(savedMovies, searchSavedMovies, isShortMovies);
		const notFound = filteredMovies.length === 0;
		setIsNotFound(notFound);
		setViewMoviesSaved(filteredMovies);
	}, [savedMovies, isShortMovies]);

	function handleSearchSavedMovie(e) {
		const searchData = e.target.value;
		setSearchSavedMovies(searchData);
		localStorage.setItem('searchSavedMovies', searchData);
	}

	function handleFilterSearch(searchData) {
		if (searchData === '') {
			setIsNotFound(false);
		} else {
			const filteredMovies = filterSearch(savedMovies, searchData, isShortMovies);
			if (filteredMovies.length === 0) {
				setIsNotFound(true);
			} else {
				setIsNotFound(false);
			}
			setViewMoviesSaved(filteredMovies);
			localStorage.setItem('filteredSearchMovies', JSON.stringify(filteredMovies));
		}
	}

	function checkShortMovie(e) {
		const checked = e.target.checked;
		setIsShortMovies(checked);
		localStorage.setItem('isShortSaved', JSON.stringify(checked));
	}

	function handleCardDelete(movieId) {
		const updatedMovies = viewMoviesSaved.filter((m) => m._id !== movieId);
		setSavedMovies(updatedMovies);
		onCardDelete(movieId);
	}

	return (
		<>
			<Header onBurgerIcon={onBurgerIcon} loggedIn={loggedIn} />
			<main>
				<section className="movies">
					<SearchForm
						savedMovies={savedMovies}
						isShortMovies={isShortMovies}
						handleSearchMovie={handleSearchSavedMovie}
						handleFilterSearch={handleFilterSearch}
						checkShortMovie={checkShortMovie}
						searchMovies={searchSavedMovies}
					/>
					{isLoading ? (
						<Preloader />
					) : (
						<>
							{isNotFound ? (
								<p className="card-list__message">{NOT_FOUND_MESSAGE}</p>
							) : isErrorRequest ? (
								<p className="card-list__message">{ERROR_REQUEST_MESSAGE}</p>
							) : (
								<MoviesCardList
									movies={viewMoviesSaved}
									savedMovies={savedMovies}
									isNotFound={isNotFound}
									isErrorRequest={isErrorRequest}
									onCardDelete={handleCardDelete}
								/>
							)}
						</>
					)}
				</section>
			</main>
			<Footer />
		</>
	);
}

export default SavedMovies;