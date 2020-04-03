import React from 'react';
import {
	BaseStyles,
	Flex,
	theme,
	Text,
	Box
} from '@primer/components'
import {
	blue,
	paddedContainer
} from '../style'
import styled, { ThemeProvider } from 'styled-components'
import { AccountsManager } from './Apps/AccountManager/main';
import { TopNavigationBar } from '/imports/ui/Components/top-navigation-bar'
import { Router, RouteComponentProps } from '@reach/router'
import { RouteProtocol } from '/imports/ui/Router/protocol'
import { StreamsRouter } from './Apps/Streams/router';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import { Link } from '/imports/ui/Components/link'

interface DashboardAppInfo extends RouteProtocol {
	title: string,
	link: string,
	icon: IconProp
}

const apps: DashboardAppInfo[] = [
	{
		title: 'Accounts',
		component: AccountsManager,
		path: 'accounts',
		link: 'accounts',
		icon: faUsers
	},
	{
		title: 'Streams',
		component: StreamsRouter,
		path: 'streams/*',
		link: 'streams',
		icon: faYoutube
	}
]

export const Dashboard = () => (
	<ThemeProvider theme={theme}>
		<BaseStyles>
			<TopNavigationBar/>

			<Router>
				<Overview path="/"/>
				{apps.map(App)}
			</Router>
		</BaseStyles>
	</ThemeProvider>
);

const Overview = (_: RouteComponentProps) => <Flex {...paddedContainer} marginTop={3}>
	{apps.map(Card)}
</Flex>

const Card = (info: DashboardAppInfo) => <StyledLink to={info.link} key={info.path}>
	<Box paddingX={4} paddingY={3} key={info.path}>
		<Box>
			<FontAwesomeIcon icon={info.icon} size={"4x"}/>
		</Box>
		<Text>{info.title}</Text>
	</Box>
</StyledLink>

const App = (info: RouteProtocol) => <info.component key={info.path} path={info.path} />

const StyledLink = styled(Link)`
	text-align: center;
	color: ${blue}
`