import { VIEW_SHORT_MOVIE } from "./constants";

export function filterSearch(apiMovies, searchMovies, isShortMovies) {
	return apiMovies.filter((movie) => {
		return isShortMovies
			? ((movie.nameEN.toLowerCase().includes(searchMovies.toLowerCase()) ||
				movie.nameRU.toLowerCase().includes(searchMovies.toLowerCase())) &&
				movie.duration < VIEW_SHORT_MOVIE)
			: (movie.nameEN.toLowerCase().includes(searchMovies.toLowerCase()) ||
				movie.nameRU.toLowerCase().includes(searchMovies.toLowerCase()))
	});
}
