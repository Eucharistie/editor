import React, { ReactFragment, MouseEventHandler } from 'react'
import {Box, BaseStyles, Button, Heading} from '@primer/components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, IconDefinition, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'
import { Meteor } from 'meteor/meteor'
import { navigate } from '@reach/router'

function handleLogin(error?: Error) {
	if (error) {
		console.log(error)
	} else {
		navigate('/')
	}
}

const loginWithYoutube  = () => Meteor.loginWithGoogle(  {}, handleLogin)
const loginWithFacebook = () => Meteor.loginWithFacebook({}, handleLogin)
const loginWithTwitter  = () => Meteor.loginWithTwitter( {}, handleLogin)

export const Login = () => (
	<BaseStyles>
		<Box m={4}>
			<Heading as="h2" fontSize={3} mb={2}>Login using</Heading>

			<Table>
				<LoginButton color="#FF001C" onClick={loginWithYoutube} title="YouTube" icon={faYoutube} />
				<LoginButton color="#3B6AAE" onClick={loginWithFacebook} title="facebook" icon={faFacebook} />
				<LoginButton color="#00A5ED" onClick={loginWithTwitter} title="Twitter" icon={faTwitter} />
			</Table>
		</Box>
	</BaseStyles>
)

const Table = (props: {children: ReactFragment}) => (
	<table>
		<tbody>{props.children}</tbody>
	</table>
)

// Login button with icon and text
interface LoginButtonProps {
	title: String
	icon: IconDefinition
	color: any
	onClick: MouseEventHandler
}
const LoginButton = (props: LoginButtonProps) => (
	<tr>
		<td>
			<FullWidthButton mb={2} onClick={props.onClick}>
				<Box color={props.color}>
					<Icon icon={props.icon} size="2x"/>
					<Box as="span" ml={2} verticalAlign="middle">{props.title}</Box>
				</Box>
			</FullWidthButton>
		</td>
	</tr>
)

const FullWidthButton = styled(Button)`
	width: 100%;
	text-align: left;
`

const Icon = styled(FontAwesomeIcon)`vertical-align: middle`;