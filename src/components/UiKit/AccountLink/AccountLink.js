import React from 'react';
import './AccountLink.css';
import { Link } from 'react-router-dom';

function AccountLink() {
	return (
		<div className="account">
			<Link to="/profile" className="account__link">
				Аккаунт
			</Link>
		</div>
	)
}

export default AccountLink;