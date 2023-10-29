export const notFoundMessage = 'Ничего не найдено';
export const errorRequestMessage = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const EMAIL_REGEX = "^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$";
// export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const VIEW_SHORT_MOVIE = 40;

export const filterDuration = (movies) => {
	return movies.filter(movie => movie.duration < VIEW_SHORT_MOVIE);
}

export const viewWidths = {
	desktop: 1280,
	tablet: 1023,
	tabletMini: 768,
	mobile: 320,
};

export const cardCounts = {
	desktop: 16,
	tablet: 12,
	tabletMini: 8,
	mobile: 5,
};

export const showMoreCards = {
	desktop: 4,
	tablet: 3,
	mobile: 2,
};