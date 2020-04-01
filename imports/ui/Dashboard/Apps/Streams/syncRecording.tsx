import React from 'react'
import {Stream} from "/imports/api/collections/Streams";
import {paddedContainer} from "/imports/ui/style";
import {Box} from "@primer/components";
import YouTube from "@u-wave/react-youtube";
import {useState} from "react";
import { TextLinker } from '/imports/ui/TextEditor/viewer';

export const SyncRecording = (props: {stream: Stream}) => {
    const [player, setPlayer] = useState(null as null|YT.Player)

    function initPlayer(event: YT.PlayerEvent) {
        setPlayer(event.target)
    }

    return <Box {...paddedContainer} marginTop={2}>
        <YouTube
            video={props.stream.videoId}
            playsInline={true}
            onReady={initPlayer}
        />
        <TextLinker
            editorStateJSON={props.stream.text}
            onLinkTag={(_)=>{ }}
        />
    </Box>
}