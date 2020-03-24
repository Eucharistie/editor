import React from 'react'
import {LoginButtons} from './buttons'
import { BaseStyles, Box, Grid } from '@primer/components'

export const LoginPage = () => (
    <BaseStyles>
        <Grid>
            <Box>
                <LoginButtons />
            </Box>
        </Grid>
    </BaseStyles>
)