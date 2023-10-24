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

function App() {
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [isSavedMovies, setIsSavedMovies] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
	const [isInfoTooltipImage, setIsInfoTooltipImage] = useState(false);
	const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState('');
	const navigate = useNavigate();

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
		tokenCheck();
	}, []);


	function handleBurgerClick() {
		setIsBurgerOpen(!isBurgerOpen);
	}

	const tokenCheck = () => {
		const token = localStorage.getItem('token');
		if (token) {
			auth.getContent(token)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						navigate('/movies', { replace: true });
					}
				})
				.catch(err => console.log(err));
		}
	};

	const handleRegister = ({ name, email, password }) => {
		auth.register(name, email, password)
			.then((res) => {
				if (res) {
					setIsInfoTooltipPopup(true);
					setIsInfoTooltipImage(true);
					setIsInfoTooltipMessage('Вы успешно зарегистрировались!');
					handleLogin({ email, password });
					navigate('/movies', { replace: true });
				}
			}).catch((err) => {
				setIsInfoTooltipPopup(true);
				setIsInfoTooltipImage(false);
				setIsInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
				console.log(err);
			});
	};

	const handleLogin = ({ email, password }) => {
		auth.login(email, password)
			.then((res) => {
				if (res.token) {
					localStorage.setItem('token', res.token);
					localStorage.setItem('loggedIn', 'true');
					setLoggedIn(true);
					navigate('/movies', { replace: true });
				}
			})
			.catch((err) => {
				setIsInfoTooltipPopup(true);
				setIsInfoTooltipImage(false);
				setIsInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
				console.log(err);
			});
	};

	const handleUpdateUser = (userInfo) => {
		api.editInfoProfile(userInfo)
			.then((data) => {
				setIsInfoTooltipPopup(true);
				setIsInfoTooltipImage(true);
				setIsInfoTooltipMessage('Данные профиля обновлены');
				setCurrentUser(data);
			})
			.catch((err) => {
				setIsInfoTooltipPopup(true);
				setIsInfoTooltipImage(false);
				setIsInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
				console.log(err);
			});
	}

	const handleSignOut = () => {
		localStorage.removeItem('token');
		setLoggedIn(false);
		setCurrentUser({});
		setIsSavedMovies([]);
		localStorage.removeItem('loggedIn');
		localStorage.clear();
		navigate('/', { replace: true });
	}

	const handleCardLike = (movie) => {
		api
			.savedMovieProfile(movie)
			.then((newMovie) => {
				setIsSavedMovies([newMovie, ...isSavedMovies]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleCardDelete = (movie) => {
		const movieId = isSavedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
		if (movieId) {
			api
				.deleteMovieProfile(movieId._id)
				.then(() => {
					const newSavedMovies = isSavedMovies.filter((savedMovie) => savedMovie._id !== movieId._id);
					setIsSavedMovies(newSavedMovies);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	function closeAllPopups() {
		setIsBurgerOpen(false);
		setIsInfoTooltipPopup(false)
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Routes>
					<Route path='/signin' element={<Login onLogin={handleLogin} />} />
					<Route path='/signup' element={<Register onRegister={handleRegister} />} />
					<Route path='/*' element={<NotFound />} />
					<Route path='/' element={
						<>
							<Header
								onBurgerClick={handleBurgerClick}
								loggedIn={loggedIn}
							/>
							<Main />
							<Footer />
						</>
					} />

					<Route
						path='/movies'
						element={<ProtectedRoute
							element={Movies}
							onBurgerIcon={handleBurgerClick}
							loggedIn={loggedIn}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
						/>} />
					<Route path='/saved-movies' element={
						<ProtectedRoute
							element={SavedMovies}
							loggedIn={loggedIn}
							onCardLike={handleCardLike}
							isSavedMovies={isSavedMovies}
							setIsSavedMovies={setIsSavedMovies}
							onCardDelete={handleCardDelete}
						/>
					} />
					<Route path='/profile' element={
						<ProtectedRoute
							element={Profile}
							loggedIn={loggedIn}
							onCardLike={handleCardLike}
							onSignOut={handleSignOut}
							onUpdateUser={handleUpdateUser}
						/>
					} />
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