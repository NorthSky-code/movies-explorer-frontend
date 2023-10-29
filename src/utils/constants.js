export const notFoundMessage = 'Ничего не найдено';
export const errorRequestMessage = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const EMAIL_REGEX = "^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$";

export const VIEW_SHORT_MOVIE = 40;

export const filterDuration = (movies) => {
	return movies.filter(movie => movie.duration < VIEW_SHORT_MOVIE);
}

export const VIEW_WIDTHS = {
	DESKTOP: 1280,
	TABLET: 1023,
	TABLET_MINI: 768,
	MOBILE: 320,
};

export const CARD_COUNTS = {
	DESKTOP: 16,
	TABLET: 12,
	TABLET_MINI: 8,
	MOBILE: 5,
};

export const SHOW_MORE_CARDS = {
	DESKTOP: 4,
	TABLET: 3,
	MOBILE: 2,
};