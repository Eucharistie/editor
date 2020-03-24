import { Router, RouteComponentProps, navigate } from '@reach/router';

import React from 'react';
import { App } from '/imports/ui/App'
import { Login } from '/imports/ui/Login/main'
import { useAccount } from '/imports/api/accounts'

const RoutedApp = (_properties: RouteComponentProps) => <App/>
const RoutedLogin = (_properties: RouteComponentProps) => <Login/>

export const Routes = () => {
	const {isLoggedIn} = useAccount()

	if (!isLoggedIn) {
		navigate("/login")
	}

	return (
		<Router>
			<RoutedApp path="/" />
			<RoutedLogin path="/login"/>
			{/* <Route component={NotFoundPage}/> */}
		</Router>
	)
};