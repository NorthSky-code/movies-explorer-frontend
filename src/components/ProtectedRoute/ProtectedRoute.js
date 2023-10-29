import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ loading, element: Component, ...props }) => {
	return (
		loading ? null : (
			props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />
		)
	);
};