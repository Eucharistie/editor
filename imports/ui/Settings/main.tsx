import React from 'react'
import {ThemeProvider} from "styled-components";
import {
    BaseStyles,
    Box,
    Button,
    StyledOcticon,
    theme,
} from "@primer/components";
import {SignOut} from '@primer/octicons-react'
import {TopNavigationBar} from "/imports/ui/Components/top-navigation-bar";
import {
    navigate,
    useLocation
} from "@reach/router";
import {Gear} from "@primer/octicons-react";
import {Toggle} from "/imports/ui/Components/toggle";
import {paddedContainer} from "/imports/ui/style";
import { Meteor } from 'meteor/meteor';
import {
    Profile,
    ProfileProps
} from "/imports/ui/Settings/Profile";
import { useAccount } from "/imports/api/accounts";
import {
    getFacebookProfile,
    getGoogleProfile,
    getTwitterProfile
} from "/imports/ui/Settings/socialProfiles";

export const Settings = () => {
    const {user} = useAccount()

    function getProfile(): ProfileProps {
        if (user) {
            if (user.services.facebook) return getFacebookProfile(user.services.facebook)
            if (user.services.google) return getGoogleProfile(user.services.google)
            if (user.services.twitter) return getTwitterProfile(user.services.twitter)
        }
        return {name: ""}
    }

    return <ThemeProvider theme={theme}>
        <BaseStyles>
            <TopNavigationBar right={ToggleSettings}/>

            <Box {...paddedContainer} marginTop={4}>
                <Profile {...getProfile()} />
                <Button onClick={_ => Meteor.logout()}>
                    Log out
                    <StyledOcticon icon={SignOut} marginLeft={2}/>
                </Button>
            </Box>
        </BaseStyles>
    </ThemeProvider>
}

const ToggleSettings = () => {
    const location = useLocation()

    function redirect() {
        //@ts-ignore
        navigate(location.state?.origin ?? '/dashboard')
    }

    return <Toggle isOn onToggle={_ => redirect()}>
        <StyledOcticon icon={Gear} size={23}/>
    </Toggle>
}