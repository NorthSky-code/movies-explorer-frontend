class MainApi {
	constructor({ baseUrl }) {
		this._baseUrl = baseUrl;
	}

	_responseOutput(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	};

	getInitialMovies() {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/movies`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			}
		}).then(this._responseOutput)
	}

	savedMovieProfile(movie) {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/movies`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				movieId: movie.id,
				nameRU: movie.nameRU,
				nameEN: movie.nameEN,
				director: movie.director,
				country: movie.country,
				year: movie.year,
				duration: movie.duration,
				description: movie.description,
				trailerLink: movie.trailerLink,
				image: movie.image,
				thumbnail: movie.thumbnail,
			})
		})
			.then(this._responseOutput)
	}


	getInfoProfile() {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}).then(this._responseOutput)
	}

	editInfoProfile({ name, email }) {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				email
			})
		}).then(this._responseOutput)

	}

	deleteMovieProfile(movieId) {
		const token = localStorage.getItem('token');
		return fetch(`${this._baseUrl}/movies/${movieId}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}).then(this._responseOutput)
	}

}

const mainApi = new MainApi({
	baseUrl: 'https://api.northsky.movie.nomoreparties.co',
	// baseUrl: 'localhost:3001',
});

export default mainApi;
