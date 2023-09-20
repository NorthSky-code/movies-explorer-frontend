import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {

	const [isChecked, setIsChecked] = useState(true);

	const handleChangeShortMovies = (e) => {
		setIsChecked(e.target.checked);
	}

	return (
		<section className="filter">
			<label className="filter__switch">
				<input
					id="filter__name"
					type="checkbox"
					checked={isChecked}
					onChange={handleChangeShortMovies}
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