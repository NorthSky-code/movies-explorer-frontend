import React from 'react';
import './MoreMovies.css';

function MoreMovies({ movies, initialMovies, showMore }) {
	return (
		<div className="more-movies">
			<button onClick={showMore} type="button" className={`more-movies__btn ${movies.length === initialMovies.length ? 'more-movies__btn_hidden' : ''}`}>Ещё</button>
		</div>
	)
}

export default MoreMovies;