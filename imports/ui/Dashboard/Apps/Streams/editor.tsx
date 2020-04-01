import React from 'react';
import {Stream, StreamsCollection} from '/imports/api/collections/Streams'
import {Box, TextInput, Button} from '@primer/components'
import moment from 'moment'
import { paddedContainer } from '/imports/ui/style';
import { TextEditor } from '/imports/ui/TextEditor/editor'
import { EditorState } from 'prosemirror-state';

export const StreamDetails = (stream: Stream) => {
	function updateStream(textState: EditorState, lastId: number | null) {
		StreamsCollection.update(stream._id!, {$set: {
			text: textState.toJSON(),
			tagFrom: lastId ?? 0
		}})
	}

	return (
		<Box {...paddedContainer} marginTop={2}>
			<Box>Created at: {moment(stream.createdAt).format()}</Box>
			<Box>
				Video ID: <TextInput value={stream.videoId}/> <Button>Save</Button>
			</Box>
			<TextEditor onStateChange={updateStream} editorStateJSON={stream.text} counter={stream.tagFrom ?? 0}/>
		</Box>
	)
}