import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {

	const [isChecked, setIsChecked] = useState(true);

	const handleCheckBoxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<section className="filter">
			<label class="filter__switch">
				<input type="checkbox" checked={isChecked} onClick={handleCheckBoxChange}></input>
				<span class="filter__slider"></span>
			</label>
			<p className="filter__name">
				Короткометражки
			</p>
		</section>
	)
}

export default FilterCheckbox;