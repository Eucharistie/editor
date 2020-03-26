import React from 'react'
import {LoginButtons} from './buttons'
import { BaseStyles, Flex, Heading, Relative, Text, Box, BorderBox, Button } from '@primer/components'
import Octicon, {ArrowRight} from '@primer/octicons-react'
import { useAccount } from '/imports/api/accounts'
import { navigate } from '@reach/router'
import { mainRoutes } from '/imports/startup/client/router'

export const LoginPage = () => {
    const {isLoggedIn, userId} = useAccount()

    console.log('userid', userId)

    return <BaseStyles>
        <Box backgroundColor="black" color="white" paddingY={50}>
            <Flex width={[null, 1, 1, 900]} marginX="auto" paddingX={[4,4,4,0]} alignItems="center" flexWrap={['wrap', 'wrap', 'nowrap']} justifyContent='center'>
                <Text textAlign={['left', 'center', 'left']}>
                    <Relative paddingRight={[3, null, 5, 10]} marginBottom={4}>
                        <Heading fontSize={[35, 50]}>Aanpassingen in een oogopslag</Heading>
                        <Text fontSize={[18, 23]}>
                            Houd uw informatie actueel met deze editor. Pas je misuren of misteksten hier aan en geef honderden mensen toegang tot jouw recentste informatie.
                        </Text>
                    </Relative>
                </Text>
                {isLoggedIn ? <RedirectButton/> : <SignUpWindow/>}
            </Flex>
        </Box>
    </BaseStyles>
}

const SignUpWindow = () => (
    <BorderBox paddingY={3} paddingX={4} backgroundColor="white" color="black">
        <Heading as="h2" fontSize={3} mb={2}>Aanmelden</Heading>
        <Text>Meld je aan met een social netwerk account en ga aan de slag:</Text>

        <Box marginTop={3}>
            <LoginButtons/>
        </Box>
    </BorderBox>
)

const RedirectButton = () => (
    <Button onClick={ () => navigate(mainRoutes.dashboard.path) }>
        <Text marginRight={2}>Ga naar het dashboard</Text>
        <Octicon icon={ArrowRight}/>
    </Button>
)