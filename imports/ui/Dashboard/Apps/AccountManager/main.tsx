import React from 'react';
import { Hello } from '/imports/ui/Hello';
import { Info } from '/imports/ui/Info';
import { ThemeProvider } from 'styled-components'
import { BaseStyles, Flex, Box, BorderBox, theme, SideNav, Heading } from '@primer/components'

import { paddedContainer } from '/imports/ui/style'

export const AccountsManager = () => <ThemeProvider theme={theme}>
<BaseStyles>
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

declare module '@primer/components' {
	interface SideNavLinkProps {
		selected?: boolean
	}
}