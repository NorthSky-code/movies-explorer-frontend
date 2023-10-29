import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Burger from '../Popup/Burger';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import * as auth from '../../utils/auth';
import api from '../../utils/MainApi';
import { REGISTRATION_ERROR, REGISTRATION_SUCCESS_MESSAGE, AUTHORIZATION_ERROR, PROFILE_UPDATED } from '../../utils/constants'

function App() {
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') || false);
	const [savedMovies, setSavedMovies] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
	const [isInfoTooltipImage, setIsInfoTooltipImage] = useState(false);
	const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState('');

	const [isAuthLoading, setIsAuthLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (loggedIn) {
			api
				.getInitialMovies()
				.then((data) => {
					setSavedMovies(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [loggedIn]);

	useEffect(() => {
		if (loggedIn) {
			api
				.getInfoProfile()
				.then((data) => {
					setCurrentUser(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [loggedIn]);


	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			auth
				.getContent(token)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
					}
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setIsAuthLoading(false)
				})
		}
	}, []);

	function handleBurgerClick() {
		setIsBurgerOpen(!isBurgerOpen);
	}

	const handleRegister = ({ name, email, password }) => {
		auth
			.register(name, email, password)
			.then((res) => {
				if (res) {
					setIsInfoTooltipPopup(true);
					setIsInfoTooltipImage(true);
					setIsInfoTooltipMessage(REGISTRATION_SUCCESS_MESSAGE);
					handleLogin({ email, password });
				}
			})
			.catch(() => {
				setIsInfoTooltipPopup(true);
				setIsInfoTooltipImage(false);
				setIsInfoTooltipMessage(REGISTRATION_ERROR);
			});
	};

	const handleLogin = ({ email, password }) => {
		auth
			.login(email, password)
			.then((res) => {
				if (res.token) {
					localStorage.setItem('token', res.token);
					setLoggedIn(true);
					navigate('/movies');
				}
			})
			.catch(() => {
				setIsInfoTooltipPopup(true);
				setIsInfoTooltipImage(false);
				setIsInfoTooltipMessage(AUTHORIZATION_ERROR);
			});
	};

	const handleUpdateUser = (userInfo) => {
		api
			.editInfoProfile(userInfo)
			.then((data) => {
				setIsInfoTooltipPopup(true);
				setIsInfoTooltipImage(true);
				setIsInfoTooltipMessage(PROFILE_UPDATED);
				setCurrentUser(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSignOut = () => {
		setLoggedIn(false);
		localStorage.removeItem('token');
		localStorage.removeItem('loggedIn');
		localStorage.clear();
		navigate('/');
	};

	const handleCardLike = (movie) => {
		api
			.savedMovieProfile(movie)
			.then((newMovie) => {
				setSavedMovies([newMovie, ...savedMovies]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleCardDelete = (movieId) => {
		api
			.deleteMovieProfile(movieId)
			.then(() => {
				const newSavedMovies = savedMovies.filter((savedMovie) => savedMovie._id !== movieId);
				setSavedMovies(newSavedMovies);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	function closeAllPopups() {
		setIsBurgerOpen(false);
		setIsInfoTooltipPopup(false);
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Routes>
					<Route path='/signin' element={
						<Login
							onLogin={handleLogin}
						/>} />
					<Route path='/signup' element={
						<Register
							onRegister={handleRegister}
						/>} />
					<Route
						path='/'
						element={
							<>
								<Header
									onBurgerIcon={handleBurgerClick}
									loggedIn={loggedIn}
								/>
								<Main />
								<Footer />
							</>
						} />
					<Route
						path='/movies'
						element={
							<ProtectedRoute
								element={Movies}
								loading={isAuthLoading}
								onBurgerIcon={handleBurgerClick}
								loggedIn={loggedIn}
								onCardLike={handleCardLike}
								onCardDelete={handleCardDelete}
								savedMovies={savedMovies}
							/>} />
					<Route
						path='/saved-movies'
						element={
							<ProtectedRoute
								element={SavedMovies}
								onBurgerIcon={handleBurgerClick}
								loggedIn={loggedIn}
								loading={isAuthLoading}
								onCardLike={handleCardLike}
								savedMovies={savedMovies}
								setSavedMovies={setSavedMovies}
								onCardDelete={handleCardDelete}
							/>} />
					<Route
						path='/profile'
						element={
							<ProtectedRoute
								element={Profile}
								loggedIn={loggedIn}
								loading={isAuthLoading}
								onCardLike={handleCardLike}
								onBurgerIcon={handleBurgerClick}
								onSignOut={handleSignOut}
								onUpdateUser={handleUpdateUser}
							/>} />
					<Route path='/*' element={<NotFound />} />
				</Routes>
				<Burger
					isOpen={isBurgerOpen}
					onClose={closeAllPopups}
				/>
				<InfoTooltip
					isOpen={isInfoTooltipPopup}
					onClose={closeAllPopups}
					title={isInfoTooltipMessage}
					regImage={isInfoTooltipImage}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
