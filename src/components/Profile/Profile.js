import React, { useState } from 'react';
import './Profile.css';

function Profile() {
	const [username, setUsername] = useState('Виталий');
	const [useremail, setUseremail] = useState('pochta@yandex.ru');
	const [isDisabled, setIsDisabled] = useState(true);
	const [error, setError] = useState(false);

	const handleNameChange = (e) => {
		setUsername(e.target.value);
	};

	const handleEmailChange = (e) => {
		setUseremail(e.target.value);
	};

	const handleChangeStatus = (e) => {
		e.preventDefault();
		setIsDisabled(!isDisabled);
		setError(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(true);
	};

	return (
		<main>
			<section className="profile">
				<form className="profile__form">
					<h1 className="profile__form-title">Привет, {username}!</h1>
					<div className="profile__info">
						<div className="profile__info-item">
							<label htmlFor="username" className="profile__info-item_field">Имя</label>
							<input
								className="profile__info-item_input"
								id="username"
								type="text"
								name="name"
								placeholder="Укажите вае имя"
								value={username}
								onChange={handleNameChange}
								minLength={2}
								maxLength={40}
								disabled={isDisabled}
								required
							/>
						</div>
						<div className="profile__info-item">
							<label htmlFor="useremail" className="profile__info-item_field">E-mail</label>
							<input
								className="profile__info-item_input"
								id="useremail"
								type="email"
								name="email"
								placeholder="Укажите ваш email"
								value={useremail}
								onChange={handleEmailChange}
								minLength={2}
								maxLength={40}
								disabled={isDisabled}
								required
							/>
						</div>
					</div>
					<div className="profile__form-buttons">
						{isDisabled ? (
							<div className="profile__btn-container">
								<button type="button" className="button button__edit" onClick={handleChangeStatus} >Редактировать</button>
								<button type="button" className="button button__exit">Выйти из аккаунта</button>
							</div>
						) : (
							<div className="profile__save-container">
								{error &&
									<span className="profile__error">
										При обновлении профиля произошла ошибка.
									</span>}
								<button type="submit" className={`button button__save ${error && 'button__save_disabled'}`} onClick={handleSubmit} disabled={error}>
									Сохранить
								</button>
							</div>
						)}
					</div>
				</form>
			</section>
		</main>
	)
}

export default Profile;