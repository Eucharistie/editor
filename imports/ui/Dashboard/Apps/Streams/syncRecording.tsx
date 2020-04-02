import React from 'react'
import {Stream} from "/imports/api/collections/Streams";
import {Box} from "@primer/components";
import YouTube from "@u-wave/react-youtube";
import {useState} from "react";
import { TextLinker } from '../../../TextEditor/linker';
import styled from 'styled-components';

export const SyncRecording = (props: {stream: Stream}) => {
	const [player, setPlayer] = useState(null as null|YT.Player)

	function initPlayer(event: YT.PlayerEvent) {
		setPlayer(event.target)
	}

	function linkTag(id: number) {
		// TODO
		console.log('link id', id, 'to player time', player?.getCurrentTime())
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
			/>
		</TextContainer>
	</PlayerContainer>
}


const videoAspect = 16/9
const fullWidth = 100
const halfWidth = 50
const adaptHeight = (width: number) => width/videoAspect
const adaptedWidth = fullWidth*videoAspect

const textMargin = 1
const notEnoughHeightForTextUnderVideo = 'only screen and (min-aspect-ratio: 16/12)'
const prefersTwoColumns = 'only screen and (max-width: 59.999em)'
const prefersOverlay = 'only screen and (min-width: 60em)'
const centerOverlay = `only screen and (min-width: calc(${adaptedWidth}vh + 20em + ${2*textMargin}em))`
const videoHigherThanSceen = `(max-height: ${adaptHeight(fullWidth)}vw)`

const PlayerContainer = styled(Box)`
	position: relative;

	@media ${notEnoughHeightForTextUnderVideo} {
		@media ${centerOverlay} and ${videoHigherThanSceen} {
			left: calc((100vw - 177.7778vh - 20em - ${textMargin}em * 2) / 2)
		}
	};
`

const Player = styled(YouTube)`
	width: ${fullWidth}vw;
	height: ${adaptHeight(fullWidth)}vw;
	max-height: 100vh;

	@media ${notEnoughHeightForTextUnderVideo} {
		@media ${prefersTwoColumns} {
			width: ${halfWidth}vw;
			height: ${adaptHeight(halfWidth)}vw;
		};
		@media ${prefersOverlay} and ${videoHigherThanSceen} {
			width: ${100*videoAspect}vh;
		};
	};
`

const TextContainer = styled.div`
	margin: ${textMargin}em;
	height: calc(100vh - ${adaptHeight(fullWidth)}vw - ${2*textMargin}em);

	@media ${notEnoughHeightForTextUnderVideo} {
		@media ${prefersTwoColumns} {
			position: absolute;
			top: 0;
			left: 50vw;
			right: 0;
			height: calc(100vh);

			margin-top: 0;
			margin-bottom: 0;
		};

		@media ${prefersOverlay} {
			height: auto;
		
			position: absolute;
			top: ${textMargin}em;
			bottom: ${textMargin}em;
			right: ${textMargin}em;
			width: 20em;
			margin: 0;

			transition-property: top, bottom;
			transition-duration: 200ms;

			@media ${centerOverlay} and ${videoHigherThanSceen} {
				left: calc(${adaptedWidth}vh + ${textMargin}em);
				right: auto;
			}
		};
	};
`

const StyledTextLinker = styled(TextLinker)`
	height: 100%;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;

	@media ${notEnoughHeightForTextUnderVideo} {
		@media ${prefersOverlay} {
			position: absolute;
			top: 1em;
			bottom: 1em;
			right: 1em;
			left: 1em;
			height: auto;
	
			mix-blend-mode: multiply;
		}
	};
`

const FadedBackground = styled.div`
	@media ${notEnoughHeightForTextUnderVideo} {
		@media ${prefersOverlay} {
			background: rgba(255, 255, 255, 0.75);
			-moz-backdrop-filter: blur(15px);
			-webkit-backdrop-filter: blur(15px);
			backdrop-filter: blur(15px);
			width: 100%;
			height: 100%;
			border-radius: 5px;
		};
	};
`