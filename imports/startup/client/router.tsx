import { Router, RouteComponentProps, navigate } from '@reach/router';

import React from 'react';
import { App } from '/imports/ui/App'
import { LoginPage } from '../../ui/Login/page'
import { useAccount } from '/imports/api/accounts'

interface Route {
	path: string,
	component: (_properties: RouteComponentProps<{}>) => JSX.Element
}

export const mainRoutes: {[name: string]: Route} = {
	dashboard: {
		path: '/dashboard',
		component: App
	},
	login: {
		path: '/',
		component: LoginPage,
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
					<info.component path={info.path} key={name} />
				)
			}

			{React.createElement(LoginPage, {default: true})}
		</Router>
	)
};

