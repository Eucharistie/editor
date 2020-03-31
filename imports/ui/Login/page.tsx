import React from 'react'
import {LoginButtons} from './buttons'
import { BaseStyles, Flex, Heading, Relative, Text, Box, BorderBox, Button } from '@primer/components'
import Octicon, {ArrowRight} from '@primer/octicons-react'
import { useAccount } from '/imports/api/accounts'
import { navigate } from '@reach/router'
import { mainRoutes } from '../Router/main/router'
import { paddedContainer } from '../style'

export const LoginPage = (properties: {loginError?: Error}) => {
	const {isLoggedIn} = useAccount()

	return <BaseStyles>
		<Box backgroundColor="black" color="white" paddingY={50}>
			<Flex {...paddedContainer} alignItems="center" flexWrap={['wrap', 'wrap', 'nowrap']} justifyContent='center'>
				<HeroText />
				{isLoggedIn ? <RedirectButton/> : <SignUpWindow loginError={properties.loginError}/>}
			</Flex>
		</Box>
	</BaseStyles>
}

const HeroText = () => (
	<Text textAlign={['left', 'center', 'left']}>
		<Relative paddingRight={[3, null, 5, 10]} marginBottom={4}>
			<Heading fontSize={[35, 50]}>Aanpassingen in een oogopslag</Heading>
			<Text fontSize={[18, 23]}>
				Houd uw informatie actueel met deze editor. Pas je misuren of misteksten hier aan en geef honderden mensen toegang tot jouw recentste informatie.
			</Text>
		</Relative>
	</Text>
)

const SignUpWindow = (properties: {loginError?: Error}) => (
	<BorderBox paddingY={3} paddingX={4} backgroundColor="white" color="black">
		<Heading as="h2" fontSize={3} mb={2}>Aanmelden</Heading>
		<Text>Meld je aan met een social netwerk account en ga aan de slag:</Text>
		{ properties.loginError &&
			<Text color='state.error' as='p'>Probleem bij het inloggen: {properties.loginError.message}</Text>
		}
		<Box marginTop={3}>
			<LoginButtons/>
		</Box>
	</BorderBox>
)

const RedirectButton = () => (
	<Button onClick={ () => navigate(mainRoutes.dashboard.path) }>
		<Text marginRight={2}>Ga naar het dashboard</Text>
		<Octicon icon={ArrowRight}/>
	</Button>
)