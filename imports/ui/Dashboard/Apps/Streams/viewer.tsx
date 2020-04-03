import React, {useEffect, useState, useRef} from 'react'
import { Stream } from '/imports/api/collections/Streams'
import { Player, PlayerContainer, TextContainer, FadedBackground, layoutTextView } from './viewer-layout'
import { TextViewer } from '/imports/ui/TextEditor/viewer'
import { useTracker } from "meteor/react-meteor-data";
import { CueTimeline } from '/imports/api/collections/Timeline'
// @ts-ignore
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const isPlaying = 1

export const Viewer = (props: {stream: Stream}) => {
	const textView = useRef<TextViewer>()
	const timeline = useTracker(() => {
		return CueTimeline.find({stream: props.stream._id}, {sort: {time: 1}}).fetch()
	})
	const [player, setPlayer] = useState(null as YT.Player|null)
	const [currentCue, setCurrentCue] = useState(0)
	let intervalHandle = null as number|null

	function updateTracking(event: YT.OnStateChangeEvent) {
		if (intervalHandle) clearInterval(intervalHandle)
		if (event.data == isPlaying) {
			intervalHandle = window.setInterval(trackVideo, 200)
		}
	}

	function trackVideo() {
		console.log('tick')
		if (player === null || timeline.length == 0) return
		const time = player.getCurrentTime()
		const cueIndex = findCueIndex(time)
		if (cueIndex == currentCue) return
		setCurrentCue(cueIndex)
		const cue = timeline[cueIndex]
		const text = document.querySelector(`.tagged.tag-${cue.id}`)
		const scrollView = textView.current?.editorDomNode.current
		console.log(text, textView)
		if (text && scrollView) {
			scrollView.scrollTo({
				left: 0,
				top: stickyOffsetFor(text, scrollView),
				behavior: 'smooth'
			})
		}
	}

	function findCueIndex(time: number) {
		const index = binarySearch(timeline.length, (index: number) => time < timeline[index].time) - 1
		return Math.max(Math.min(index, timeline.length - 1), 0)
	}

	useEffect(() => {
		// Resume tracking after component update
		const playerState = player?.getPlayerState()
		if (playerState === isPlaying) {
			updateTracking({target: player!, data: playerState!})
		}

		// Clean up video tracking
		return function() {
			if (intervalHandle) clearInterval(intervalHandle)
		}
	})

	return <PlayerContainer marginTop={2}>
		<Player
			video={props.stream.videoId}
			playsInline={true}
			onStateChange={updateTracking}
			onReady={event => setPlayer(event.target)}
		/>
		<TextContainer>
			<FadedBackground />
			<FloatingTextViewer
				editorStateJSON={props.stream.text}
				ref={textView}
			/>
		</TextContainer>
	</PlayerContainer>
}

//@ts-ignore
const FloatingTextViewer = layoutTextView(TextViewer)

/*
 * Return i such that !pred(i - 1) && pred(i) && 0 <= i <= length.
 */
function binarySearch(length: number, pred: (index: number)=>boolean) {
	let lo = -1, hi = length;
	while (1 + lo < hi) {
		const mi = lo + ((hi - lo) >> 1);
		if (pred(mi)) hi = mi;
		else lo = mi;
	}
	return hi;
}


// Calculate the scrollOffset to a node
function stickyOffsetFor(node: Element, textContainer: Element) {
	let parent = node
	// basic offset calculation
	const offset = node.getBoundingClientRect().top - textContainer.firstElementChild!.getBoundingClientRect().top

	// If there is a sticky element adjust offset. Otherwise return the basic offset
	let h3 = false as Element|false
	while (parent.parentElement) {
		parent = parent.parentElement
		// If it's a header, remember this for later
		if (parent.tagName.toLowerCase() == 'h3') h3 = parent
		// If it's a sticking node itself
		if (parent.classList.contains('stick')) {
			return measureNonSticking(parent, textContainer) // Early exit
		}
		// If there is a sticky title on top, find it and add it's height to offset, then do an early exit
		if (parent.classList.contains('sticky-container')) {
			if (h3) return measureNonSticking(h3, textContainer)
			
			let sticker = parent.querySelector('.stick, h3')
			if (sticker) {
				const bounds = sticker.getBoundingClientRect()
				return offset - bounds.height - 10
			}
		}
	}

	// return basic offset
	return offset
}

function measureNonSticking(node: Element, textContainer: Element) {
	// Disable stickyness and return element to its original non-sticky position
	node.classList.add('js-measurement')
	// Measure position
	const offset = node.getBoundingClientRect().top - textContainer.firstElementChild!.getBoundingClientRect().top
	// Enable stickyness again
	node.classList.remove('js-measurement')
	return offset
}