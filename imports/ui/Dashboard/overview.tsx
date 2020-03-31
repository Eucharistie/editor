import React from 'react';
import { BaseStyles, Flex, theme, BorderBox, Text } from '@primer/components'
import { paddedContainer } from '../style'
import { ThemeProvider } from 'styled-components'
import { AccountsManager } from './Apps/AccountManager/main';
import { TopNavigationBar } from '../top-navigation-bar'
import { Link, Router, RouteComponentProps } from '@reach/router'
import { RouteProtocol } from '/imports/ui/Router/protocol'
import { StreamOverview } from './Apps/Streams/overview';

interface DashboardAppInfo extends RouteProtocol {
	title: string
}

const apps: DashboardAppInfo[] = [
	{
		title: 'Accounts',
		component: AccountsManager,
		path: 'accounts'
	},
	{
		title: 'Streams',
		component: StreamOverview,
		path: 'streams'
	}
]

export const Dashboard = () => (
	<ThemeProvider theme={theme}>
		<BaseStyles>
			<TopNavigationBar />

			<Router>
				<Overview path="/"/>
				{apps.map(App)}
			</Router>
		</BaseStyles>
	</ThemeProvider>
);

const Overview = (props: RouteComponentProps) => <Flex {...paddedContainer} marginTop={3}>
	{apps.map(Card)}
</Flex>

const Card = (info: DashboardAppInfo) => <Link to={info.path} key={info.path}>
	<BorderBox p={4} key={info.path}>
		<Text>{info.title}</Text>
	</BorderBox>
</Link>

const App = (info: RouteProtocol) => <info.component key={info.path} path={info.path} />