class MovieApi {
	constructor({ baseUrl }) {
		this._baseUrl = baseUrl;
	}

	_responseOutput(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	};

	getMovies() {
		return fetch(`${this._baseUrl}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
		}).then(this._responseOutput)
	}
}

const movieApi = new MovieApi({
	baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
})

export default movieApi;