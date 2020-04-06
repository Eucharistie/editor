import React, {useState, useRef} from 'react';
import {Stream, StreamsCollection} from '/imports/api/collections/Streams'
import {BaseStyles, Box, Button, ButtonDanger, Dialog, Flex, TextInput} from '@primer/components'
import moment from 'moment'
import { paddedContainer } from '/imports/ui/style';
import { TextEditor } from '/imports/ui/TextEditor/editor'
import { EditorState } from 'prosemirror-state';
import ReactPlayer from 'react-player'
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import {faWifi, faTrash, faFileSignature } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {} from 'styled-components/cssprop'
import {Link, navigate} from "@reach/router";
import {HighlightCues} from "/imports/ui/Dashboard/Apps/Streams/viewer-layout";
import {useTracker} from "meteor/react-meteor-data";
import {CueTimeline} from "/imports/api/collections/Timeline";

export const StreamDetails = (props: {stream: Stream}) => {
	function updateStream(textState: EditorState, lastId: number | null) {
		StreamsCollection.update(props.stream._id!, {$set: {
			text: textState.toJSON(),
			tagFrom: Math.max(props.stream.tagFrom ?? 0, lastId ?? 0)
		}})
	}

	const player = useRef<ReactPlayer>()
	const timeline = useTracker(function() {
		return CueTimeline.find({stream: props.stream._id}).fetch()
	})

	function changeId(event: React.ChangeEvent<HTMLInputElement>) {
		StreamsCollection.update(props.stream._id!, {$set: {videoId: event.target.value}})
		setTimeout(() => {
			player.current?.seekTo(0)
		}, 100)
	}

	function logError(error: any) {
		console.log('error', error)
	}

	function getTitle() {
		try {
			// If it is a youtube video get its title
			// @ts-ignore
			const data = player.current?.getInternalPlayer().getVideoData() as VideoData
			if (data && data.title.length > 0) {
				StreamsCollection.update(props.stream._id!, {$set: {title: data.title}})
			}
		} catch (error) {}
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
				Video URL: <TextInput value={props.stream.videoId ?? ''} onChange={changeId}/>
				<ButtonDanger onClick={_ => openRemoveDialog(true)}>
					<PaddedIcon icon={faTrash}/> Delete stream
				</ButtonDanger>
			</p>
			<p>Created at: {moment(props.stream.createdAt).format()}</p>
			<Box marginY={2}>
				<ReactPlayer
					url={props.stream.videoId}
					playsInline={true}
					onError={logError}
					controls
					onBuffer={getTitle}
					ref={player}
				/>
			</Box>
			<Flex>
				<Link to={"viewer"}>
					<Button><PaddedIcon icon={faYoutube} size={"lg"}/> Preview</Button>
				</Link>
				<Link to={"recording"}>
					<Button><PaddedIcon icon={faFileSignature} size={"lg"}/> Sync Recording</Button>
				</Link>
				<Link to={"live"}>
					<Button><PaddedIcon icon={faWifi}/> Sync Live</Button>
				</Link>
			</Flex>
			<Box marginTop={2}>
				<TextEditor
					onStateChange={updateStream}
					editorStateJSON={props.stream.text}
					counter={props.stream.tagFrom ?? 0}
				/>
				<HighlightCues timeline={timeline}/>
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