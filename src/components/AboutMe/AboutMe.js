import React from 'react';
import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio.js';
import photo from '../../images/photo.png'

function AboutMe() {
	return (
		<section className="about-me">
			<h2 className="about-me__title">Студент</h2>
			<div className="about-me__wrapper">
				<div className="about-me__wrapper-text">
					<h3 className="about-me__name">Виталий</h3>
					<p className="about-me__desc">Фронтенд-разработчик, 30 лет</p>
					<p className="about-me__info">
						Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
						и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
					</p>
					<a href="https://github.com/NorthSky-code/movies-explorer-frontend" target="_blank" rel="noreferrer" className="about-me__link">Github</a>
				</div>
				<img src={photo} alt="Фото студента" className="about-me__photo" />
			</div>
			<Portfolio />
		</section>
	)
}

export default AboutMe;