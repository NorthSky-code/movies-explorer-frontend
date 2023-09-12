import React from 'react';
import '../Register/Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {

	return (
		<main className="register">
			<div className="register__logo">
				<Link to="/"><img src={logo} alt="Логотип" /></Link>
			</div>
			<form action="" className="register__form">
				<h2 className="register__form-title">Рады видеть!</h2>
				<label htmlFor="register-email" className="register__form-field">E-mail</label>
				<input
					className="register__form-input"
					id="email"
					type="email"
					name="email"
					value={'pochta@yandex.ru|'}
					required />
				<span className="register__form_error"></span>
				<label htmlFor="userpassword" className="register__form-field">Пароль</label>
				<input
					className="register__form-input"
					type="password"
					name="password"
					id="userpassword"
					value={''}
					required />
				<span className="register__form_error">Что-то пошло не так...</span>
				<button type="submit" className="register__form-btn register__form-log">Войти</button>
			</form>
			<div className="register__question">
				<p className="register__question-text">Ещё не зарегистрированы?</p>
				<Link to='/signup' className="register__question-link">Регистрация</Link>
			</div>
		</main>
	)
}

export default Login;