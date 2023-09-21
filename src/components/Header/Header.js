import './Header.css';
import React from 'react';
import Navigation from '../Navigation/Navigation.js';

function Header(props) {
	return (
		<header className="header">
			<Navigation {...props} />
		</header>
	);
}

export default Header;