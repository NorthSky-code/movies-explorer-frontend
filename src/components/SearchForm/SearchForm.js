import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import find from '../../images/find.svg';

function SearchForm({ handleSearchMovie, searchMovies, handleFilterSearch, checkShortMovie, isShortMovies }) {
	const [errors, setErrors] = useState({ search: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchMovies.length === 0) {
			setErrors({ search: 'Нужно ввести ключевое слово' });
		} else {
			setErrors({ search: '' });
		}
		handleFilterSearch(searchMovies);
	};

	return (
		<section className="search">
			<form onSubmit={handleSubmit} className="search__form" noValidate>
				<div className="search__input">
					<input
						className="search__text"
						value={searchMovies}
						onChange={handleSearchMovie}
						placeholder="Фильм"
						minLength={2}
						maxLength={40}
						required
					/>
					<button type="submit" className="search__btn">
						<img src={find} alt="иконка поиска" />
					</button>
				</div>
				<div className="register__form-error">
					{errors.search && <span>{errors.search}</span>}
				</div>
			</form>
			<FilterCheckbox
				checkShortMovie={checkShortMovie}
				isShortMovies={isShortMovies}
			/>
		</section>
	);
}

export default SearchForm;
