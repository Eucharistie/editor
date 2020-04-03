import {
    Avatar,
    Box,
    Flex,
    Heading
} from "@primer/components";
import React from "react";

export interface ProfileProps {
    pictureUrl?: string,
    name: string
}

export const Profile = (profile: ProfileProps) => <Flex>
    <Avatar mb={4} src={profile.pictureUrl} size={128} />
    <Box marginLeft={4}>
        <Heading>{profile.name}</Heading>
    </Box>
</Flex>