import React from 'react'
import { CircularLogo } from '/imports/Logo/logo';
import { Gear } from '@primer/octicons-react'
import { Flex, Box, StyledOcticon, Link as PrimerLink} from '@primer/components'
import { paddedContainer, blue } from '/imports/ui/style'
import { Link } from './link'
import { Toggle } from './toggle'

export const TopNavigationBar = () => <Box backgroundColor={blue} color='white' paddingY={3}>
	<Box {...paddedContainer}>
		<Flex justifyContent='space-between' alignItems='center'>
			<Box>
				<PrimerLink href="https://eucharistie.info">
					<CircularLogo size={40} bg='white' fg={blue} display='inline-block' verticalAlign='middle' marginX={4} />
				</PrimerLink>
				
				<Box display='inline' verticalAlign='middle'>
					<Link to="/dashboard" fontSize={23} color="white">Editor</Link>
				</Box>
			</Box>

			<Toggle onToggle={isOn => console.log('toggled', isOn)}><StyledOcticon icon={Gear} size={23}/></Toggle>
		</Flex>
	</Box>
</Box>
