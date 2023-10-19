import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ checkShortMovie, isShortMovies }) {

	return (
		<section className="filter">
			<label className="filter__switch">
				<input
					id="filter__name"
					type="checkbox"
					checked={isShortMovies}
					onChange={checkShortMovie}
				>
				</input>
				<span className="filter__slider"></span>
			</label>
			<label htmlFor="filter__name" className="filter__name">
				Короткометражки
			</label>
		</section>
	)
}

export default FilterCheckbox;