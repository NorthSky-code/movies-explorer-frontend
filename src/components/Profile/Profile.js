import React from 'react';
import './Profile.css';

function Profile() {
	return (
		<section className="profile">
			<main>
				<form action="" className="profile__form">
					<h2 className="profile__form-title">Привет, Виталий!</h2>
					<div className="profile__info">
						<div className="profile__info-item">
							<label htmlFor="username" className="profile__info-item_field">Имя</label>
							<input
								className="profile__info-item_input"
								type="text"
								name="name"
								id="username"
								value={'Виталий'}
								required />
						</div>
						<div className="profile__info-item">
							<label htmlFor="useremail" className="profile__info-item_field">E-mail</label>
							<input
								className="profile__info-item_input"
								type="email"
								name="email"
								id="useremail"
								value={'pochta@yandex.ru'}
								required />
						</div>
					</div>
					<div className="profile__form-buttons">
						<button type="button" className="button button__edit">Редактировать</button>
						<button type="button" className="button button__exit">Выйти из аккаунта</button>
					</div>
				</form>
			</main>
		</section>
	)
}

export default Profile;