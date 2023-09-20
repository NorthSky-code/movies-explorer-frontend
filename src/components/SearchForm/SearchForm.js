import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import find from '../../images/find.svg'

function SearchForm() {
	const [searchMovie, setSearchMovie] = useState('');

	const handleChangeMovie = (e) => {
		setSearchMovie(e.target.value);
	}

	return (
		<section className="search">
			<form className="search__input">
				<input
					className="search__text"
					name="search"
					type="text"
					value={searchMovie}
					onChange={handleChangeMovie}
					placeholder="Фильм"
					required
				/>
				<button type="submit" className="search__btn"><img src={find} alt="иконка поиска" /></button>
			</form>
			<FilterCheckbox />
		</section>
	)
}

export default SearchForm;