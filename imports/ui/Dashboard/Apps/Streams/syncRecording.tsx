import React from 'react'
import {Stream} from "/imports/api/collections/Streams";
import {paddedContainer} from "/imports/ui/style";
import {Box} from "@primer/components";
import {TextEditor} from "/imports/ui/TextEditor/editor";
import YouTube from "@u-wave/react-youtube";
import {useState} from "react";

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
        <TextEditor
            editorStateJSON={props.stream.text}
            onStateChange={_=>{}}
            counter={props.stream.tagFrom}
            editable={false}
        />
    </Box>
}