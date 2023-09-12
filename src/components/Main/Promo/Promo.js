import React from 'react';
import './Promo.css';

function Promo() {
	return (
		<section className="promo">
			<div className="promo__content">
				<div className="promo__text">
					<h1 className="promo__title">
						Учебный проект студента факультета Веб-разработки.
					</h1>
					<p className="promo__subtitle">
						Листайте ниже, чтобы узнать больше про этот проект и его создателя.
					</p>
				</div>
				<div className="promo__image"></div>
			</div>
			<a href="#about-project" className="promo__link">Узнать больше</a>
		</section>
	);
}

export default Promo;