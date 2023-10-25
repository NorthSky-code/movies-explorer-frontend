import React, { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movieApi from '../../utils/MovieApi';
import { filterSearch } from '../../utils/filterSearch';
import { viewWidths, cardCounts, showMoreCards } from '../../utils/constants';

function Movies({ onBurgerIcon, loggedIn, onCardLike, onCardDelete }) {
	const [apiMovies, setApiMovies] = useState(JSON.parse(localStorage.getItem('reqMovies')) || []);
	const [movies, setMovies] = useState(apiMovies);
	const [searchMovies, setSearchMovies] = useState(localStorage.getItem('searchMovies') || '');
	const [isLoading, setIsLoading] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [isErrorRequest, setIsErrorRequest] = useState(false);
	const [cardMoviesView, setCardMoviesView] = useState(0);
	const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem('isShort')) || false);

	useEffect(() => {
		const storedMovies = JSON.parse(localStorage.getItem('reqMovies'));

		if (storedMovies) {
			setApiMovies(storedMovies);
			handleFilterSearch(searchMovies);
		} else {
			setIsLoading(true);
			movieApi
				.getMovies()
				.then((dataMovie) => {
					localStorage.setItem('reqMovies', JSON.stringify(dataMovie));
					setApiMovies(dataMovie);
					handleFilterSearch(searchMovies);
				})
				.catch((err) => {
					setIsErrorRequest(true);
					console.log(err);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, []);

	useEffect(() => {
		handleResize();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			window.addEventListener('resize', handleResize);
		}, 1000);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleResize = () => {
		const screenWidth = window.innerWidth;
		let cardCount = 0;

		if (screenWidth >= viewWidths.desktop) {
			cardCount = cardCounts.desktop;
		} else if (screenWidth >= viewWidths.tablet) {
			cardCount = cardCounts.tablet;
		} else if (screenWidth >= viewWidths.tabletMini) {
			cardCount = cardCounts.tabletMini;
		} else {
			cardCount = cardCounts.mobile;
		}

		setCardMoviesView(cardCount);
	};

	function handleShowMoreCards() {
		const screenWidth = window.innerWidth;
		let addShowCards = 0;

		if (screenWidth >= viewWidths.desktop) {
			addShowCards = showMoreCards.desktop;
		} else if (screenWidth >= viewWidths.tablet) {
			addShowCards = showMoreCards.tablet;
		} else {
			addShowCards = showMoreCards.mobile;
		}

		setCardMoviesView((prevCount) => prevCount + addShowCards);
	}

	function handleSearchMovie(e) {
		const searchData = e.target.value;
		setSearchMovies(searchData);
		setCardMoviesView(handleResize)
		localStorage.setItem('searchMovies', searchData);
	}

	function handleFilterSearch(searchData) {
		if (searchData === '') {
			setIsNotFound(false);
		} else {
			const filteredMovies = filterSearch(apiMovies, searchData, isShortMovies);
			if (filteredMovies.length === 0) {
				setIsNotFound(true);
			} else {
				setIsNotFound(false);
			}
			setMovies(filteredMovies);
			setCardMoviesView(handleResize)
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
			<Header onBurgerIcon={onBurgerIcon} loggedIn={loggedIn} />
			<main>
				<section className="movies">
					<SearchForm
						handleSearchMovie={handleSearchMovie}
						handleFilterSearch={handleFilterSearch}
						searchMovies={searchMovies}
						checkShortMovie={checkShortMovie}
						isShortMovies={isShortMovies}
					/>
					<MoviesCardList
						movies={movies}
						isLoading={isLoading}
						isNotFound={isNotFound}
						isErrorRequest={isErrorRequest}
						countMovies={cardMoviesView}
						showMore={handleShowMoreCards}
						onCardLike={onCardLike}
						onCardDelete={onCardDelete}
					/>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default Movies;