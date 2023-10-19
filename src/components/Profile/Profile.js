import './Profile.css';
import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { EMAIL_REGEX } from '../../utils/constants';


function Profile({ onBurgerIcon, loggedIn, onUpdateUser, onSignOut }) {
	const currentUser = useContext(CurrentUserContext);
	const { values, handleChange, isValid } = useFormWithValidation();

	const [isDisabled, setIsDisabled] = useState(true);

	const handleChangeStatus = () => {
		setIsDisabled(!isDisabled);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onUpdateUser({
			name: values.name,
			email: values.email,
		});
		setIsDisabled(false);
	};

	const handleLogout = () => {
		onSignOut();
	};

	return (

		<section className="profile">
			<Header
				onBurgerIcon={onBurgerIcon}
				loggedIn={loggedIn}
			/>
			<form onSubmit={handleSubmit} className="profile__form" noValidate>
				<h1 className="profile__form-title">Привет, {currentUser.name}!</h1>
				<div className="profile__info">
					<div className="profile__info-item">
						<label htmlFor="username" className="profile__info-item_field">
							Имя
						</label>
						<input
							className="profile__info-item_input"
							id="username"
							type="text"
							name="name"
							placeholder="Укажите ваше имя"
							defaultValue={currentUser.name}
							onChange={handleChange}
							minLength={2}
							maxLength={40}
							disabled={isDisabled}
							required
						/>
					</div>
					<div className="profile__info-item">
						<label htmlFor="useremail" className="profile__info-item_field">
							E-mail
						</label>
						<input
							className="profile__info-item_input"
							id="useremail"
							type="email"
							name="email"
							placeholder="Укажите ваш email"
							defaultValue={currentUser.email}
							onChange={handleChange}
							minLength={2}
							maxLength={40}
							disabled={isDisabled}
							pattern={EMAIL_REGEX}
							required
						/>
					</div>
				</div>
				<div className="profile__form-buttons">
					{isDisabled ? (
						<div className="profile__btn-container">
							<button
								type="button"
								className="button button__edit"
								onClick={handleChangeStatus}
							>
								Редактировать
							</button>
							<button type="button" className="button button__exit" onClick={handleLogout}>
								Выйти из аккаунта
							</button>
						</div>
					) : (
						<div className="profile__save-container">
							<button
								type="submit"
								className={`button button__save ${!isValid ? 'button__save_disabled' : ''}`}
								disabled={!isValid}
							>
								Сохранить
							</button>
						</div>
					)}
				</div>
			</form>
		</section>
	);
}

export default Profile;