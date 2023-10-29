import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";

export const ProtectedRoute = ({ loading, element: Component, ...props }) => {
	if (loading) {
		return <Preloader />
	}
	return (
		props.loggedIn ? <Component {...props} /> : <Navigate to='/' replace />
	)
}
