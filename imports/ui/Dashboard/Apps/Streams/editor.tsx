import React, {useState} from 'react';
import {Stream, StreamsCollection} from '/imports/api/collections/Streams'
import {
	BaseStyles,
	BorderBox,
	Box,
	Button,
	ButtonDanger,
	Dialog,
	Flex,
	TextInput,
} from '@primer/components'
import moment from 'moment'
import { paddedContainer } from '/imports/ui/style';
import { TextEditor } from '/imports/ui/TextEditor/editor'
import { EditorState } from 'prosemirror-state';
import YouTube from '@u-wave/react-youtube'
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import {faWifi, faTrash } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {} from 'styled-components/cssprop'
import {navigate} from "@reach/router";


export const StreamDetails = (props: {stream: Stream}) => {
	function updateStream(textState: EditorState, lastId: number | null) {
		StreamsCollection.update(props.stream._id!, {$set: {
			text: textState.toJSON(),
			tagFrom: lastId ?? 0
		}})
	}

	const [player, setPlayer] = useState(null as YT.Player|null);

	function changeId(event: React.ChangeEvent<HTMLInputElement>) {
		StreamsCollection.update(props.stream._id!, {$set: {videoId: event.target.value}})
		setTimeout(() => {
			player?.seekTo(0, true)
			player?.pauseVideo()
		}, 100)
	}

	function initPlayer(event: YT.PlayerEvent) {
		setPlayer(event.target)
	}

	function logError(error: any) {
		console.log('error', error)
	}

	function stateChanged(state: YT.PlayerEvent) {
		const player = state.target as YT.Player & {getVideoData(): VideoData}
		const data = player.getVideoData()
		if (data && data.title.length > 0) {
			StreamsCollection.update(props.stream._id!, {$set: {title: data.title}})
		}
	}

	let [removeDialogIsOpen, openRemoveDialog] = useState(false)

	async function removeStream(_: React.MouseEvent) {
		await navigate( '/dashboard/streams')
		StreamsCollection.remove(props.stream._id!, function(error?: Error) {
			if (error) {
				navigate( '/dashboard/streams/'+props.stream._id!)
			}
		})
	}

	return (
		<Box {...paddedContainer} marginTop={2}>
			<p>
				Video ID: <TextInput value={props.stream.videoId ?? ''} onChange={changeId}/>
				<ButtonDanger onClick={_ => openRemoveDialog(true)}>
					<PaddedIcon icon={faTrash}/> Delete stream
				</ButtonDanger>
			</p>
			<p>Created at: {moment(props.stream.createdAt).format()}</p>
			<Box marginY={2}>
				<YouTube
					video={props.stream.videoId}
					playsInline={true}
					onReady={initPlayer}
					onError={logError}
					onStateChange={stateChanged}
				/>
			</Box>
			<Flex>
				<Button><PaddedIcon icon={faYoutube} size={"lg"}/> Sync Recording</Button>
				<Button><PaddedIcon icon={faWifi}/> Sync Live</Button>
			</Flex>
			<Box marginTop={2}>
				<TextEditor
					onStateChange={updateStream}
					editorStateJSON={props.stream.text}
					counter={props.stream.tagFrom ?? 0}
				/>
			</Box>


			<Dialog title='Stream verwijderen?' isOpen={removeDialogIsOpen} onDismiss={()=>openRemoveDialog(false)}>
				<BaseStyles>
					<Box paddingBottom={2} paddingX={3}>
						<p>Al je tekst en de synchronisatie zullen verloren gaan en kunnen niet meer teruggehaald worden. Ben je zeker dat je door wil gaan?</p>

						<Box>
							<ButtonDanger css='width: 100%' onClick={removeStream}>Verwijder</ButtonDanger>
						</Box>
					</Box>
				</BaseStyles>
			</Dialog>
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