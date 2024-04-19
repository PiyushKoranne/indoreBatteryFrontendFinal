import React from 'react';
import { LoginContext } from '../../App';
import {Route, Navigate} from "react-router-dom";


const AuthenticatedRoute = ({element, ...props}) => {
	const {loginStatus} = React.useContext(LoginContext);

	return (
		<Route {...props} element={loginStatus?.isLoggedIn ? element : <Navigate to={"/"} replace />} />
	)
}

export default AuthenticatedRoute