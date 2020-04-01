import React, {useState} from 'react';
import {Stream, StreamsCollection} from '/imports/api/collections/Streams'
import {
	Box,
	Button,
	ButtonDanger,
	Flex,
	TextInput
} from '@primer/components'
import moment from 'moment'
import { paddedContainer } from '/imports/ui/style';
import { TextEditor } from '/imports/ui/TextEditor/editor'
import { EditorState } from 'prosemirror-state';
import YouTube from '@u-wave/react-youtube'
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import {faWifi, faTrash } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


export const StreamDetails = (stream: Stream) => {
	function updateStream(textState: EditorState, lastId: number | null) {
		StreamsCollection.update(stream._id!, {$set: {
			text: textState.toJSON(),
			tagFrom: lastId ?? 0
		}})
	}

	const [player, setPlayer] = useState(null as YT.Player|null);

	function changeId(event: React.ChangeEvent<HTMLInputElement>) {
		StreamsCollection.update(stream._id!, {$set: {videoId: event.target.value}})
		setTimeout(() => {
			player?.seekTo(0, true)
			player?.pauseVideo()
		}, 100)
	}

	function initPlayer(event: YT.PlayerEvent) {
		setPlayer(event.target)
		console.log(event.target)
	}

	function logError(error: any) {
		console.log('error', error)
	}

	function stateChanged(state: YT.PlayerEvent) {
		const player = state.target as YT.Player & {getVideoData(): VideoData}
		const data = player.getVideoData()
		if (data && data.title.length > 0) {
			StreamsCollection.update(stream._id!, {$set: {title: data.title}})
		}
	}

	return (
		<Box {...paddedContainer} marginTop={2}>
			<p>
				Video ID: <TextInput value={stream.videoId} onChange={changeId}/>
				<ButtonDanger><PaddedIcon icon={faTrash}/> Delete stream</ButtonDanger>
			</p>
			<p>Created at: {moment(stream.createdAt).format()}</p>
			<Box marginY={2}>
				<YouTube video={stream.videoId} playsInline={true} onReady={initPlayer} onError={logError} onStateChange={stateChanged}></YouTube>
			</Box>
			<Flex>
				<Button><PaddedIcon icon={faYoutube} size={"lg"}/> Sync Recording</Button>
				<Button><PaddedIcon icon={faWifi}/> Sync Live</Button>
			</Flex>
			<TextEditor onStateChange={updateStream} editorStateJSON={stream.text} counter={stream.tagFrom ?? 0}/>
		</Box>
	)
}

interface VideoData {
	video_id: string
	author: string,
	title: string,
	video_quality?: string,
	video_quality_features?: []
}

const PaddedIcon = (props: {icon: any, size?: 'lg'}) => <Box display={"inline-block"} marginRight={1}>
	<FontAwesomeIcon icon={props.icon} size={props.size}/>
</Box>