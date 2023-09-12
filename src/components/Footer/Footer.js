import React from 'react';
import './Footer.css';

function Footer() {
	return (
		<footer className='footer'>
			<h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
			<div className="footer__meta">
				<p className="footer__text">&#169;{new Date().getFullYear()}</p>
				<ul className="footer__list">
					<li className="footer__list-item">
						<a href='https://practicum.yandex.ru/profile/web/' target='_blank'
							rel='noreferrer' className='footer__link footer__text'>Яндекс.Практикум</a>
					</li>
					<li className="footer__list-item">
						<a href='https://github.com/NorthSky-code/movies-explorer-frontend' target='_blank' rel='noreferrer' className='footer__link footer__text'>Github</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer;