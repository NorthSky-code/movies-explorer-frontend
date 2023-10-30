import './AuthForm.css';
import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function AuthForm({
	handleSubmit,
	children,
	question,
	link,
	linkTitle,
}) {
	return (
		<main className="auth-form">
			<div className="auth-form__logo">
				<Link to="/"><img src={logo} className="auth-form__logo-icon" alt="Логотип" /></Link>
			</div>
			<form onSubmit={handleSubmit} className="auth-form__form" noValidate>
				{children}
			</form>
			<div className="auth-form__question">
				<p className="auth-form__question-text">{question}</p>
				<Link to={link} className="auth-form__question-link">{linkTitle}</Link>
			</div>
		</main>
	)
}

export default AuthForm;