import React from 'react';
import './AboutProject.css';

function AboutProject() {
	return (
		<section className="about-project" id="about-project">
			<h2 className="about-project__title">О проекте</h2>
			<div className="columns">
				<div className="columns__text">
					<h3 className="columns__subtitle">
						Дипломный проект включал 5 этапов
					</h3>
					<p className="columns__paragraph">
						Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
					</p>
				</div>
				<div className="columns__text">
					<h3 className="columns__subtitle">
						На выполнение диплома ушло 5 недель
					</h3>
					<p className="columns__paragraph">
						У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
					</p>
				</div>
			</div>
			<div className="sidebar">
				<div className="sidebar__bar">
					<p className="sidebar__text sidebar__text_bar-left">1 неделя</p>
					<p className="sidebar__desc">Back-end</p>
				</div>
				<div className="sidebar__bar">
					<p className="sidebar__text sidebar__text_bar-right">4 недели</p>
					<p className="sidebar__desc">Front-end</p>
				</div>
			</div>
		</section>
	)
}

export default AboutProject;