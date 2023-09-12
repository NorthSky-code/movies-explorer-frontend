import React from 'react';
import { NavLink } from 'react-router-dom';
import './Burger.css';
import Account from '../UiKit/AccountLink/AccountLink';
import close from '../../images/icon_close.svg'

function Burger({ isOpen, onClose }) {

	return (
		<section className={`burger ${isOpen ? "burger_opened" : ""}`}>
			<div className="burger__container">
				<button type="button" className="burger__btn-close" onClick={onClose}>
					<img src={close} className="burger__btn-img" alt="Иконка закрыть" />
				</button>
				<ul className="burger__list">
					<li>
						<NavLink
							to="/"
							className="burger__list-link"
							activeclassname="active"
						>
							Главная
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/movies"
							className="burger__list-link"
							activeclassname="active"
						>
							Фильмы
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/saved-movies"
							className="burger__list-link"
							activeclassname="active"
						>
							Сохранённые фильмы
						</NavLink>
					</li>
				</ul>
				<Account />
			</div>
		</section>
	);
}


export default Burger;