import React from 'react';
import './Portfolio.css';

function Portfolio() {
	return (
		<div className="portfolio">
			<h3 className="portfolio__title">Портфолио</h3>
			<ul className="portfolio__list">
				<li className="portfolio__link">
					<a href="https://github.com/NorthSky-code/how-to-learn"
						target="_blank" rel="noreferrer" className="portfolio__link-item">
						Статичный сайт
					</a>
				</li>
				<li className="portfolio__link">
					<a href="https://github.com/NorthSky-code/mesto"
						target="_blank" rel="noreferrer" className="portfolio__link-item">
						Адаптивный сайт
					</a>
				</li>
				<li className="portfolio__link">
					<a href="https://github.com/NorthSky-code/react-mesto-api-full-gha"
						target="_blank" rel="noreferrer" className="portfolio__link-item">
						Одностраничное приложение
					</a>
				</li>
			</ul>
		</div>
	)
}

export default Portfolio;