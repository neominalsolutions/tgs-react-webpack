import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type AuthGuardProps = {
	children: any;
};

function AuthGuard({ children }: AuthGuardProps) {
	const location = useLocation();

	if (localStorage.getItem('xxx-tgs-tokenn')) {
		return children; // kaldığın yerden devam et
	}

	return <Navigate to="/login"></Navigate>; // logine yönlen
}

export default AuthGuard;
