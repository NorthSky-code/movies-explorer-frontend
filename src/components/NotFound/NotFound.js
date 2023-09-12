import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
	return (
		<section className="not-found">
			<div className="not-found__text">
				<h1 className="not-found__title">404</h1>
				<h3 className="not-found__subtitle">Страница не найдена</h3>
			</div>
			<button className="not-found__btn">
				<Link to="/" className="not-found__link">Назад</Link>
			</button>
		</section>
	)
}

export default NotFound;