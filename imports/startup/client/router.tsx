import { Router, RouteComponentProps } from '@reach/router';

import React from 'react';
import { App } from '/imports/ui/App'

const RoutedApp = (_properties: RouteComponentProps) => <App/>

export const renderRoutes = () => (
	<Router>
		<RoutedApp path="/" />
		{/* <Route exact path="/signin" component={AuthPageSignIn}/> */}
		{/* <Route component={NotFoundPage}/> */}
	</Router>
);