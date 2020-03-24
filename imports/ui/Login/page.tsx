import React from 'react'
import {LoginButtons} from './buttons'
import { BaseStyles, Flex, Heading, Relative, Text, Box, BorderBox } from '@primer/components'

export const LoginPage = () => (
    <BaseStyles>
        <Box backgroundColor="black" color="white" paddingY={50}>
            <Flex width={900} marginX="auto" alignItems="center">
                <Relative paddingRight={10} marginBottom={4}>
                    <Heading fontSize={50}>Aanpassingen in een oogopslag</Heading>
                    <Text fontSize={23}>
                        Houd uw informatie actueel met deze editor. Pas je misuren of misteksten hier aan en geef honderden mensen toegang tot jouw recentste informatie.
                    </Text>
                </Relative>
                <BorderBox paddingY={3} paddingX={4} backgroundColor="white" color="black">
                    <Heading as="h2" fontSize={3} mb={2}>Aanmelden</Heading>
                    <Text>Meld je aan met een social netwerk account en ga aan de slag:</Text>

                    <Box marginX={5} marginTop={3}>
                        <LoginButtons />
                    </Box>
                </BorderBox>
            </Flex>
        </Box>
    </BaseStyles>
)