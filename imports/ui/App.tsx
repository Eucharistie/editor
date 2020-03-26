import React, { ReactFragment } from 'react';
import { Hello } from './Hello';
import { Info } from './Info';
import {BaseStyles, Flex, Box, BorderBox, theme, Text, Link, StyledOcticon, ButtonProps, SideNav, Heading} from '@primer/components'
import styled from 'styled-components'
import {Gear} from '@primer/octicons-react'
import {paddedContainer, blue} from '/imports/ui/Layout'
import {ThemeProvider} from 'styled-components'
import { CircularLogo } from '../Logo/logo';
//@ts-ignore
import ButtonBase from '@primer/components/src/ButtonBase'

export const Dashboard = () => (
	<ThemeProvider theme={theme}>
	<BaseStyles>
		<Box backgroundColor={blue} color='white' paddingY={3}>
			<Box {...paddedContainer}>
				<Flex justifyContent='space-between' alignItems='center'>
					<Box>
						<Link href="https://eucharistie.info">
							<CircularLogo size={40} bg='white' fg={blue} display='inline-block' verticalAlign='middle' marginX={4} />
						</Link>
						
						<Box display='inline' verticalAlign='middle'>
							<Text fontSize={23}>Editor: instellingen</Text>
						</Box>
					</Box>

					<Toggle isOn onToggle={isOn => console.log('toggled', isOn)}><StyledOcticon icon={Gear} size={23}/></Toggle>
				</Flex>
			</Box>
		</Box>


		<Flex {...paddedContainer} marginTop={3}>
			<Box>
				<SideNav bordered marginRight={3}>
					<SideNav.Link>Misuren</SideNav.Link>
					<SideNav.Link selected>Misteksten</SideNav.Link>
					<SideNav.Link>Gebruikers</SideNav.Link>
				</SideNav>
			</Box>

			<BorderBox paddingX={2}>
				<Heading>Welcome to Meteor!</Heading>
				<Hello />
				<Info />
			</BorderBox>
		</Flex>

	</BaseStyles>
	</ThemeProvider>
);

const Toggle = (props: {isOn?: boolean, onToggle: (isOn: boolean)=>void} & ButtonProps) => (
	<ToggleBase {...props} onClick={() => props.onToggle(!props.isOn)} className={props.isOn ? 'toggled':''}>
		{props.children}
	</ToggleBase>
)

const ToggleBase = styled(ButtonBase)`
	background: none;
	border: none;
	color: white;

	&.toggled {
		background-color: rgba(0, 0, 0, 0.27);
		box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.12);

		&:active {
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.17);
	}

	// focus must come before :active so that the active box shadow overrides
	&:focus {
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
	}

	&:active {
		box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.12);
	}
`