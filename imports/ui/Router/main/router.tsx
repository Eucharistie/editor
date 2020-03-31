import { Router, navigate, RouteComponentProps } from '@reach/router';

import React from 'react';
import { Dashboard } from '../../Dashboard/overview'
import { LoginPage } from '../../Login/page'
import { useAccount } from '/imports/api/accounts'

export const mainRoutes = {
	dashboard: {
		path: '/dashboard/*',
		component: Dashboard,
		default: false
	},
	login: {
		path: '/',
		component: (props: RouteComponentProps) => {
			const state = props.location?.state as {loginError?: Error} | null
			return <LoginPage loginError={state?.loginError}/>
		},
		default: false
	}
}

export const WebsiteRouter = () => {
	const {isLoggedIn} = useAccount()

	if (!isLoggedIn) {
		navigate("/login")
	}

	return (
		<Router>
			{
				Object.entries(mainRoutes).map(([name, info]) =>
					<info.component path={info.path} key={name} default={info.default} />
				)
			}
		</Router>
	)
};