import { Router, navigate, RouteComponentProps, useMatch, Redirect } from '@reach/router';

import React from 'react';
import { Dashboard } from '../../Dashboard/overview'
import { LoginPage } from '../../Login/page'
import { useAccount } from '/imports/api/accounts'
import { Settings } from "/imports/ui/Settings/main";

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
	},
	settings: {
		path: '/settings/*',
		component(_: RouteComponentProps) {
			return <Settings />
		},
		default: false
	}
}

const Guard = (props: RouteComponentProps & {component: (props: RouteComponentProps) => JSX.Element}) => {
	const {isLoggedIn} = useAccount()
	const onViewerPage = useMatch('/dashboard/streams/:id/viewer')

	if (!isLoggedIn && !onViewerPage) {
		navigate('/')
	}

	return <props.component {...props}/>
}

export const WebsiteRouter = () => <Router>
	{
		Object.entries(mainRoutes).map(([name, info]) =>
			<Guard component={info.component} path={info.path} key={name} default={info.default} />
		)
	}
</Router>
