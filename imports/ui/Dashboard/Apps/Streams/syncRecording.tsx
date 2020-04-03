import   React from 'react'
import { Stream } from "imports/api/collections/Streams";
import { useState } from "react";
import { createGlobalStyle }   from 'styled-components';
import { addCue, removeCue } from '/imports/api/methods/timeline'
import { CueType, CueTimeline, CuePoint } from '/imports/api/collections/Timeline'
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'
import { Player, PlayerContainer, TextContainer, FadedBackground, layoutTextView } from './viewer-layout'
import { TextLinker } from '/imports/ui/TextEditor/linker'

export const SyncRecording = (props: {stream: Stream}) => {
	const [player, setPlayer] = useState(null as null|YT.Player)

	const timeline = useTracker(function() {
		return CueTimeline.find({stream: props.stream._id}).fetch()
	})

	function initPlayer(event: YT.PlayerEvent) {
		setPlayer(event.target)
	}

	function linkTag(id: number) {
		const time = player?.getCurrentTime()
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
			video={props.stream.videoId}
			playsInline={true}
			onReady={initPlayer}
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


const HighlightCues = createGlobalStyle` ${(props: {timeline: CuePoint[]}) => {if (props.timeline.length) {
	return `
		${props.timeline.map(createTagClassName).join(',')} {
			background: rgb(199, 223, 241) !important;
		}
	`
}}}`

function createTagClassName(cue: CuePoint) {
	return `.tag-${cue.id}`
}

const StyledTextLinker = layoutTextView(TextLinker)