import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	return (
		<main className="register">
			<div className="register__logo">
				<Link to="/"><img src={logo} className="register__logo-icon" alt="Логотип" /></Link>
			</div>
			<form className="register__form">
				<h1 className="register__form-title">Добро пожаловать!</h1>
				<label htmlFor="username" className="register__form-field">Имя</label>
				<input
					className="register__form-input"
					id="username"
					type="text"
					name="name"
					placeholder="Укажите вае имя"
					value={name}
					onChange={handleNameChange}
					minLength={2}
					maxLength={40}
					required
				/>
				<span className="register__form_error"></span>
				<label htmlFor="useremail" className="register__form-field">E-mail</label>
				<input
					className="register__form-input"
					id="useremail"
					type="email"
					name="email"
					placeholder="Укажите ваш email"
					value={email}
					onChange={handleEmailChange}
					minLength={2}
					maxLength={40}
					required
				/>
				<span className="register__form_error"></span>
				<label htmlFor="userpassword" className="register__form-field">Пароль</label>
				<input
					className="register__form-input register__form-input_error"
					id="password"
					type="password"
					name="password"
					placeholder="Укажите ваш пароль"
					value={password}
					onChange={handlePasswordChange}
					minLength={2}
					maxLength={40}
					required
				/>
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