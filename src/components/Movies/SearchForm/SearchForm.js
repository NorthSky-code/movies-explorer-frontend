import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import find from '../../../images/find.svg'

function SearchForm() {
	return (
		<section className="search">
			<form action="" className="search__input">
				<input type="text" className="search__text" placeholder="Фильм" />
				<button type="submit" className="search__btn"><img src={find} alt="иконка поиска" /></button>
			</form>
			<FilterCheckbox />
		</section>
	)
}

export default SearchForm;