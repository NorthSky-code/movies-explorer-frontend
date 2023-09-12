import React from 'react';
import './AccountLink.css';
import { NavLink } from 'react-router-dom';
import icon from '../../../images/icon__profile.svg';

function AccountLink() {
	return (
		<div className="account">
			<NavLink to="/profile" className="account__link">
				Аккаунт
				<div className="account__pic">
					<img className="account__pic-icon" src={icon} alt='Иконка профиля' />
				</div>
			</NavLink>
		</div>
	)
}

export default AccountLink;