import './Navigation.css';
import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Account from '../UiKit/AccountLink/AccountLink.js'
import logo from '../../images/logo.svg'
import burger from '../../images/burger.svg';


function Navigation(props) {
	const { onBurgerIcon, loggedIn } = props;

	const location = useLocation();


	const getNavColor = (pathname) => {
		if (pathname === '/') {
			return 'navigation__main-color';
		} else {
			return 'navigation__default-color';
		}
	}

	return (
		<section className={`navigation ${getNavColor(location.pathname)}`}>
			<div className="logo">
				<Link to="/"><img src={logo} alt="Логотип" /></Link>
			</div>
			{loggedIn ? (
				<nav className="nav">
					<ul className="nav__list">
						<li>
							<NavLink
								to="/movies"
								className="nav__list-link"
							>
								Фильмы
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/saved-movies"
								className="nav__list-link"
							>
								Сохранённые фильмы
							</NavLink>
						</li>
					</ul>
					<div className="nav__account">
						<div className="nav__account-link">
							<Account />
						</div>
						<button type="button" className="nav__burger-btn" onClick={onBurgerIcon}>
							<img src={burger} className="nav__burger-icon" alt="меню бургер" />
						</button>
					</div>
				</nav>) : (
				<nav className="nav nav__main">
					<ul className="nav__list nav__list-main">
						<li><NavLink to="/signup" className="nav__list-item">Регистрация</NavLink></li>
						<li><NavLink to="/signin" className="nav__list-item nav__list-item_signin">Войти</NavLink></li>
					</ul>
				</nav>)}
		</section>
	);
}

export default Navigation;