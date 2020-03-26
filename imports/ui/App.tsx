import React from 'react';
import { Hello } from './Hello';
import { Info } from './Info';
import {BaseStyles, Flex, Box, Text} from '@primer/components'
import {paddedContainer, containerPadding, centeredContainer} from '/imports/ui/Layout'

export const Dashboard = () => (
	<BaseStyles>
		<Box {...centeredContainer} backgroundColor='#F00'>
			<Box {...containerPadding}>
				<Text>Top navigation</Text>
			</Box>
		</Box>

		<Flex {...paddedContainer}>
			<nav></nav>

			<div>
				<h1>Welcome to Meteor!</h1>
				<Hello />
				<Info />
			</div>
		</Flex>
	</BaseStyles>
);
