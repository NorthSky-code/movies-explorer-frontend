import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Burger from '../Popup/Burger';

function App() {
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	function handleBurgerClick() {
		setIsBurgerOpen(!isBurgerOpen);
	}

	function handleLogin() {
		setLoggedIn(true);
	}

	function closeAllPopups() {
		setIsBurgerOpen(false);
	}

	return (
		<div className="page">
			<Routes>
				<Route path='/'
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
						<>
							<Header
								onBurgerIcon={handleBurgerClick}
								loggedIn={loggedIn}
							/>
							<Movies />
							<Footer />
						</>
					} />
				<Route path='/saved-movies' element={
					<>
						<Header
							onBurgerIcon={handleBurgerClick}
							loggedIn={loggedIn}
						/>
						<SavedMovies />
						<Footer />
					</>
				} />
				<Route path='/profile' element={
					<>
						<Header
							onBurgerIcon={handleBurgerClick}
							loggedIn={loggedIn}
						/>
						<Profile />
					</>
				} />
				<Route path='/signin' element={<Login
					onLogin={handleLogin}
				/>} />
				<Route path='/signup' element={<Register />} />
				<Route path='/*' element={<NotFound />} />
			</Routes>
			<Burger
				isOpen={isBurgerOpen}
				onClose={closeAllPopups}
			/>
		</div>
	);
}

export default App;
