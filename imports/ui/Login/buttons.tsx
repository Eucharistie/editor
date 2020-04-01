import React, { MouseEventHandler } from 'react'
import {Box, Button, Flex, Text} from '@primer/components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, IconDefinition, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'
import { Meteor } from 'meteor/meteor'
import { navigate } from '@reach/router'
import { mainRoutes } from '../Router/main/router'

export const LoginButtons = () => (
	<Flex flexDirection={['column', 'row', 'column']} flexWrap={['nowrap', 'wrap', 'nowrap']} mx={-1} justifyContent='center'>
		<LoginButton color="#FF001C" onClick={loginWithYoutube} title="YouTube" icon={faYoutube} />
		<LoginButton color="#3B6AAE" onClick={loginWithFacebook} title="facebook" icon={faFacebook} />
		<LoginButton color="#00A5ED" onClick={loginWithTwitter} title="Twitter" icon={faTwitter} />
	</Flex>
)


// Navigate to dashboard when logged in
function handleLogin(error?: Error) {
	if (error) {
		navigate(mainRoutes.login.path , {state: {loginError: error}})
	} else {
		navigate('/dashboard')
	}
}

const loginWithYoutube  = () => Meteor.loginWithGoogle(  {}, handleLogin)
const loginWithFacebook = () => Meteor.loginWithFacebook({}, handleLogin)
const loginWithTwitter  = () => Meteor.loginWithTwitter( {}, handleLogin)

// == Components == \\

// Login button with icon and text
const LoginButton = (props: LoginButtonProps) => (
	<Button onClick={props.onClick} mx="1" mb='1' css='text-align: left'>
		<Text color={props.color}>
			<Icon icon={props.icon} size="2x"/>
			<Box as="span" ml={2} verticalAlign="middle">{props.title}</Box>
		</Text>
	</Button>
)
interface LoginButtonProps {
	title: String
	icon: IconDefinition
	color: any
	onClick: MouseEventHandler
}

const Icon = styled(FontAwesomeIcon)`vertical-align: middle`;