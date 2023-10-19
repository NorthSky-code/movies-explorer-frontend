import React from 'react';
import '../AuthForm/AuthForm.css'
import AuthForm from '../AuthForm/AuthForm';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ onLogin }) {

	const { values, handleChange, errors, isValid } = useFormWithValidation();

	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin({
			email: values.email,
			password: values.password,
		});
	};

	return (
		<AuthForm
			handleSubmit={handleSubmit}
			formValue={values}
			question="Ещё не зарегистрированы?"
			link={'/signup'}
			linkTitle="Регистрация"
		>
			<h1 className="auth-form__title">Рады видеть!</h1>
			<label htmlFor="email" className="auth-form__field">E-mail</label>
			<input
				className="auth-form__input"
				id="email"
				type="email"
				name="email"
				placeholder="Укажите ваш email"
				value={values.email || ''}
				onChange={handleChange}
				autoComplete="off"
				minLength={2}
				maxLength={40}
				required
			/>
			<span className="auth-form__error">{errors.email}</span>
			<label htmlFor="password" className="auth-form__field">Пароль</label>
			<input
				className={`auth-form__input ${!isValid ? 'auth-form__input_error' : ''}`}
				id="password"
				type="password"
				name="password"
				placeholder="Укажите ваш пароль"
				value={values.password || ''}
				onChange={handleChange}
				autoComplete="off"
				minLength={8}
				maxLength={40}
				required
			/>
			<span className="auth-form__error">{errors.password}</span>
			<button type="submit"
				className={`auth-form__btn auth-form__log ${!isValid && 'auth-form__btn_disabled'}`}
				disabled={!isValid}>Войти</button>
		</AuthForm>
	);
}

export default Login;
