import   React from 'react'
import { Stream } from "imports/api/collections/Streams";
import { useRef } from "react";
import { addCue, removeCue } from '/imports/api/methods/timeline'
import { CueType, CueTimeline } from '/imports/api/collections/Timeline'
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'
import {
	Player,
	PlayerContainer,
	TextContainer,
	FadedBackground,
	layoutTextView,
	HighlightCues
} from './viewer-layout'
import { TextLinker } from '../../../Components/TextEditor/body/linker'
import ReactPlayer from 'react-player'

export const SyncRecording = (props: {stream: Stream}) => {
	const player = useRef<ReactPlayer>()
	const timeline = useTracker(function() {
		return CueTimeline.find({stream: props.stream._id}).fetch()
	})

	function linkTag(id: number) {
		const time = player.current?.getCurrentTime()
		if (time === undefined) throw new Meteor.Error('Cannot link text to video', 'video time not available')
		if (props.stream._id == undefined) throw new Meteor.Error('Cannot link text to video', 'Stream id is not available')
		const existingCue = CueTimeline.findOne({stream: props.stream._id, id})
		if (existingCue) {
			removeCue(existingCue._id!)
		} else {
			addCue({
				stream: props.stream._id,
				id,
				time,
				type: CueType.Text
			})
		}
	}

	return <PlayerContainer marginTop={2}>
		<Player
			url={props.stream.videoId}
			playsInline={true}
			controls
			ref={player}
		/>
		<TextContainer>
			<FadedBackground />
			<StyledTextLinker
				editorStateJSON={props.stream.text}
				onLinkTag={linkTag}
				timeline={timeline}
			/>
		</TextContainer>
		<HighlightCues timeline={timeline}/>
	</PlayerContainer>
}

const StyledTextLinker = layoutTextView(TextLinker)