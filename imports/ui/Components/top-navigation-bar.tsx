import React from 'react'
import { CircularLogo } from '/imports/Logo/logo';
import {
	Flex,
	Box,
	Link as PrimerLink,
	StyledOcticon
} from '@primer/components'
import { paddedContainer, blue } from '/imports/ui/style'
import { Link } from './link'

interface TopNavigationItems {
	right?: React.ComponentClass | React.FunctionComponent
}

export const TopNavigationBar = (props: TopNavigationItems) => {
	const RightSideComponent = props.right ?? ToggleSettings

	return <Box backgroundColor={blue} color='white' paddingY={3}>
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

				<RightSideComponent/>
			</Flex>
		</Box>
	</Box>
}


import { Gear } from '@primer/octicons-react'
import {
	navigate,
	useLocation
} from "@reach/router";
import { Toggle } from './toggle'
const ToggleSettings = () => {
	const location = useLocation()

	function redirect() {
		navigate('/settings', {state: {origin: location.pathname}})
	}

	return <Toggle onToggle={_ => redirect()}>
		<StyledOcticon icon={Gear} size={23}/>
	</Toggle>
}