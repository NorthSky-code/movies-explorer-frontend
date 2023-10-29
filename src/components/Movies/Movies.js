import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movieApi from '../../utils/MovieApi';
import Preloader from '../Preloader/Preloader';
import { filterSearch } from '../../utils/filterSearch';
import { VIEW_WIDTHS, CARD_COUNTS, SHOW_MORE_CARDS, NOT_FOUND_MESSAGE, ERROR_REQUEST_MESSAGE } from '../../utils/constants';

function Movies({ onBurgerIcon, loggedIn, onCardLike, onCardDelete, savedMovies }) {
	const [apiMovies, setApiMovies] = useState(JSON.parse(localStorage.getItem('reqMovies')) || []);
	const [movies, setMovies] = useState(apiMovies);
	const [searchMovies, setSearchMovies] = useState(localStorage.getItem('searchMovies') || '');
	const [isLoading, setIsLoading] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [isErrorRequest, setIsErrorRequest] = useState(false);
	const [cardMoviesView, setCardMoviesView] = useState(0);
	const [isShortMovies, setIsShortMovies] = useState(JSON.parse(localStorage.getItem('isShort')) || false);

	useEffect(() => {
		handleResize();
	}, []);

	useEffect(() => {
		const resizeTimeout = setTimeout(() => {
			window.addEventListener('resize', handleResize);
		}, 1000);

		return () => {
			clearTimeout(resizeTimeout);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const filteredMovies = filterSearch(apiMovies, searchMovies, isShortMovies);
		handleFilterSearch(searchMovies);
		setMovies(filteredMovies);
	}, [isShortMovies]);

	const handleResize = () => {
		const screenWidth = window.innerWidth;
		let cardCount = 0;

		if (screenWidth >= VIEW_WIDTHS.DESKTOP) {
			cardCount = CARD_COUNTS.DESKTOP;
		} else if (screenWidth >= VIEW_WIDTHS.TABLET) {
			cardCount = CARD_COUNTS.TABLET;
		} else if (screenWidth >= VIEW_WIDTHS.TABLET_MINI) {
			cardCount = CARD_COUNTS.TABLET_MINI;
		} else {
			cardCount = CARD_COUNTS.MOBILE;
		}

		setCardMoviesView(cardCount);
	};

	function handleShowMoreCards() {
		const screenWidth = window.innerWidth;
		let addShowCards = 0;

		if (screenWidth >= VIEW_WIDTHS.DESKTOP) {
			addShowCards = SHOW_MORE_CARDS.DESKTOP;
		} else if (screenWidth >= VIEW_WIDTHS.TABLET) {
			addShowCards = SHOW_MORE_CARDS.TABLET;
		} else {
			addShowCards = SHOW_MORE_CARDS.MOBILE;
		}

		setCardMoviesView((prevCount) => prevCount + addShowCards);
	}

	function handleFilterSearch(searchData) {
		if (searchData === '') {
			setIsNotFound(false);
		} else {
			if (apiMovies.length === 0) {
				setIsLoading(true);
				movieApi
					.getMovies()
					.then((dataMovie) => {
						const movies = dataMovie.map(movie => ({
							...movie,
							image: `https://api.nomoreparties.co${movie.image?.url}`,
							thumbnail: `https://api.nomoreparties.co${movie.image?.formats?.thumbnail?.url}`,
							movieId: movie.id,
						}))
						localStorage.setItem('reqMovies', JSON.stringify(movies));
						setApiMovies(movies);
						console.log(setApiMovies);
						const filteredMovies = filterSearch(movies, searchData, isShortMovies);
						if (filteredMovies.length === 0) {
							setIsNotFound(true);
						} else {
							setIsNotFound(false);
						}
						setMovies(filteredMovies);
						setCardMoviesView(handleResize());
						localStorage.setItem('filteredSearchMovies', JSON.stringify(filteredMovies));
					})
					.catch((err) => {
						setIsErrorRequest(true);
						console.log(err);
					})
					.finally(() => {
						setIsLoading(false);
					});
			} else {
				const filteredMovies = filterSearch(apiMovies, searchData, isShortMovies);
				if (filteredMovies.length === 0) {
					setIsNotFound(true);
				} else {
					setIsNotFound(false);
				}
				setMovies(filteredMovies);
				setCardMoviesView(handleResize());
				localStorage.setItem('filteredSearchMovies', JSON.stringify(filteredMovies));
			}
		}
	}

	function handleSearchMovie(e) {
		const searchData = e.target.value;
		setSearchMovies(searchData);
		handleResize();
		localStorage.setItem('searchMovies', searchData);
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
									movies={movies}
									isLoading={isLoading}
									savedMovies={savedMovies}
									isNotFound={isNotFound}
									isErrorRequest={isErrorRequest}
									countMovies={cardMoviesView}
									showMore={handleShowMoreCards}
									onCardLike={onCardLike}
									onCardDelete={onCardDelete}
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

export default Movies;
