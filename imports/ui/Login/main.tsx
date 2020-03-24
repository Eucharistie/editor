import React from 'react'
import {Box, BaseStyles, Button, Heading} from '@primer/components'
import AccountsUIWrapper from './BlazeUIWrapper'

function loginWithFacebook() {
	console.log("login with facebook")		
}

export const Login = () => (
	<BaseStyles>
		<Box m={4}>
			<Heading as="h2" fontSize={3}>Login using</Heading>

			<table>
				<tbody>
					<tr><td><Button width="100%">YouTube</Button></td></tr>
					<tr><td><Button width="100%" onClick={loginWithFacebook}>facebook</Button></td></tr>
					<tr><td><Button width="100%">Tiwtter</Button></td></tr>
				</tbody>
			</table>
				
		</Box>

		<Box marginLeft={4}>
			<AccountsUIWrapper />
		</Box>
	</BaseStyles>
)