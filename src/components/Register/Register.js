import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
	return (
		<main className="register">
			<div className="register__logo">
				<Link to="/"><img src={logo} alt="Логотип" /></Link>
			</div>
			<form action="" className="register__form">
				<h1 className="register__form-title">Добро пожаловать!</h1>
				<label htmlFor="username" className="register__form-field">Имя</label>
				<input
					className="register__form-input"
					type="text"
					name="name"
					id="username"
					value={'Виталий'}
					required />
				<span className="register__form_error"></span>
				<label htmlFor="useremail" className="register__form-field">E-mail</label>
				<input
					className="register__form-input"
					type="email"
					name="name"
					id="useremail"
					value={'pochta@yandex.ru|'}
					required />
				<span className="register__form_error"></span>
				<label htmlFor="userpassword" className="register__form-field">Пароль</label>
				<input
					className="register__form-input register__form-input_error"
					type="password"
					name="password"
					id="userpassword"
					value={'••••••••••••••'}
					required />
				<span className="register__form_error">Что-то пошло не так...</span>
				<button type="submit" className="register__form-btn">Зарегистрироваться</button>
			</form>
			<div className="register__question">
				<p className="register__question-text">Уже зарегистрированы?</p>
				<Link to='/signin' className="register__question-link">Войти</Link>
			</div>
		</main>
	)
}

export default Register;