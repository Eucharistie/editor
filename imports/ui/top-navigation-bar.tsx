import React from 'react'
import { CircularLogo } from '/imports/Logo/logo';
import { Gear } from '@primer/octicons-react'
import { Flex, Box, Text, Link, StyledOcticon} from '@primer/components'
import { paddedContainer, blue } from '/imports/ui/style'

import {Toggle} from './Dashboard/Navigation/toggle'

export const TopNavigationBar = () => <Box backgroundColor={blue} color='white' paddingY={3}>
	<Box {...paddedContainer}>
		<Flex justifyContent='space-between' alignItems='center'>
			<Box>
				<Link href="https://eucharistie.info">
					<CircularLogo size={40} bg='white' fg={blue} display='inline-block' verticalAlign='middle' marginX={4} />
				</Link>
				
				<Box display='inline' verticalAlign='middle'>
					<Text fontSize={23}>Editor</Text>
				</Box>
			</Box>

			<Toggle onToggle={isOn => console.log('toggled', isOn)}><StyledOcticon icon={Gear} size={23}/></Toggle>
		</Flex>
	</Box>
</Box>
