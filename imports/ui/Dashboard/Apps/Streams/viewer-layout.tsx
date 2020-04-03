import styled, {
	AnyStyledComponent,
	createGlobalStyle
} from 'styled-components'
import {Box} from '@primer/components'
import YouTube from '@u-wave/react-youtube'
import {CuePoint} from "/imports/api/collections/Timeline";

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

export const PlayerContainer = styled(Box)`
	position: relative;

	@media ${notEnoughHeightForTextUnderVideo} {
		@media ${centerOverlay} and ${videoHigherThanSceen} {
			left: calc((100vw - 177.7778vh - 20em - ${textMargin}em * 2) / 2)
		}
	};
`

export const Player = styled(YouTube)`
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

export const TextContainer = styled.div`
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

			${PlayerContainer}:hover & {
				top: calc(${textMargin}em + 60px);
				bottom: calc(${textMargin}em + 40px);
			}

			@media ${centerOverlay} {
				top: ${textMargin}em !important;
				bottom: ${textMargin}em !important;

				@media only screen and ${videoHigherThanSceen} {
					left: calc(${adaptedWidth}vh + ${textMargin}em);
					right: auto;
				}
			}
		};
	};
`

export function layoutTextView(textView: AnyStyledComponent){
	return styled(textView)`

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
	};`
}

export const FadedBackground = styled.div`
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

export const HighlightCues = createGlobalStyle` ${(props: {timeline: CuePoint[]}) => {if (props.timeline.length) {
	return `
		${props.timeline.map(createTagClassName).join(',')} {
			background: rgb(191, 240, 199) !important;
			border-radius: 5px;
			padding: 5px 0;
		}
	`
}}}`

function createTagClassName(cue: CuePoint) {
	return `.tag-${cue.id}`
}
