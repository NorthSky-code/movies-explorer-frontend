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
			Promise.all([api.getInfoProfile(), api.getInitialMovies()])
				.then(([data, movieCard]) => {
					setCurrentUser(data);
					setIsSavedMovies(movieCard);
				})
				.catch((error) => {
					console.log(error);
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
				setIsInfoTooltipMessage('Успех');
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
		navigate('/', { replace: true });
	}

	const handleCardLike = (newMovie) => {
		api.savedMovieProfile(newMovie)
			.then((data) => {
				setIsSavedMovies([data, ...isSavedMovies]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleCardDelete = (removeMovie) => {
		api.deleteMovieProfile(removeMovie._id)
			.then(() => {
				setIsSavedMovies(prevMovies => prevMovies.filter(movie => movie._id !== removeMovie._id));
			})
			.catch((err) => {
				console.log(err);
			});
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