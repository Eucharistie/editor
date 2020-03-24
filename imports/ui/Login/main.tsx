import React, { ReactFragment } from 'react'
import {Box, BaseStyles, Button, Heading} from '@primer/components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, IconDefinition, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'

function loginWithFacebook() {
	console.log("login with facebook")		
}

export const Login = () => (
	<BaseStyles>
		<Box m={4}>
			<Heading as="h2" fontSize={3}>Login using</Heading>

			<Table>
				<LoginButton title="YouTube" icon={faYoutube} />
				<LoginButton title="facebook" icon={faFacebook} />
				<LoginButton title="Twitter" icon={faTwitter} />
			</Table>
		</Box>
	</BaseStyles>
)

interface LoginButtonProps {
	title: String
	icon: IconDefinition
}

const FullWidthButton = styled(Button)`
	width: 100%;
	text-align: left;
`

const LoginButton = (props: LoginButtonProps) => (
	<tr>
		<td>
			<FullWidthButton>
				<FontAwesomeIcon icon={props.icon} className="ml-4"/> {props.title}
			</FullWidthButton>
		</td>
	</tr>
)

const Table = (props: {children: ReactFragment}) => (
	<table css={``}>
		<tbody>{props.children}</tbody>
	</table>
)