import React from 'react';
import { Button, Box, ButtonPrimary, StyledOcticon } from '@primer/components';
import {paddedContainer} from '/imports/ui/style'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { StreamsCollection, Stream } from '/imports/api/collections/Streams';
import { createStream } from '/imports/api/methods/streams';
import { Pencil } from '@primer/octicons-react'
import TimeAgo from 'timeago-react'


export const StreamOverview = () => {
	const myStreams = useTracker(() => {
		const userId = Meteor.userId()
		if (userId) {
			return StreamsCollection.find(
				{editorIds: userId},
				{sort: {createdAt: -1}}
			).fetch()
		} else {
			return []
		}
	})

	function addStream() {
		createStream()
	}

	return <Box {...paddedContainer} marginTop={2}>
		

		<table>
			<thead>
				<tr>
					<td>Video ID</td>
					<td>Created at</td>
					<td>
						<ButtonPrimary onClick={addStream}>Add stream</ButtonPrimary>
					</td>
				</tr>
			</thead>
			<tbody>
				{myStreams.map(StreamRow)}
			</tbody>
		</table>
	</Box>
}

const StreamRow = (stream: Stream) => <tr key={stream._id}>
	<td>{stream.videoId ?? 'No id'}</td>
	<td> <TimeAgo datetime={stream.createdAt}/></td>
</tr>