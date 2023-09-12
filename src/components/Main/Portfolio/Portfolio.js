import React from 'react';
import arrow from '../../../images/arrow_link.svg'
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
						<img src={arrow} alt="стрелка ссылки" /></a>
				</li>
				<li className="portfolio__link">
					<a href="https://github.com/NorthSky-code/mesto"
						target="_blank" rel="noreferrer" className="portfolio__link-item">
						Адаптивный сайт
						<img src={arrow} alt="стрелка ссылки" /></a>
				</li>
				<li className="portfolio__link">
					<a href="https://github.com/NorthSky-code/react-mesto-api-full-gha"
						target="_blank" rel="noreferrer" className="portfolio__link-item">
						Одностраничное приложение
						<img src={arrow} alt="стрелка ссылки" /></a>
				</li>
			</ul>
		</div>
	)
}

export default Portfolio;