import React from 'react';
import { NavLink } from 'react-router-dom';
import './Burger.css';
import Account from '../UiKit/AccountLink/AccountLink';

function Burger({ isOpen, onClose }) {
	const burgerMenu = `popup ${isOpen ? "popup_opened" : ""}`;

	return (
		<section className={burgerMenu}>
			<div className="burger">
				<button type="button" className="burger__btn-close" onClick={onClose} />
				<nav className="burger__nav">
					<ul className="burger__list">
						<li>
							<NavLink
								to="/"
								className="burger__list-link"
							>
								Главная
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/movies"
								className="burger__list-link"
							>
								Фильмы
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/saved-movies"
								className="burger__list-link"
							>
								Сохранённые фильмы
							</NavLink>
						</li>
					</ul>
					<Account />
				</nav>
			</div>
		</section>
	);
}

export default Burger;
