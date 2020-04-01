import React from 'react';
import {
	Box,
	Button,
	ButtonPrimary
} from '@primer/components';
import {paddedContainer} from '/imports/ui/style'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { StreamsCollection, Stream } from '/imports/api/collections/Streams';
import { createStream } from '/imports/api/methods/streams';
import TimeAgo from 'timeago-react'
import {Link} from '@reach/router'


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
		<ButtonPrimary onClick={addStream}>Add stream</ButtonPrimary>
		<table css='width: 100%'>
			<thead>
				<tr>
					<td>Stream</td>
					<td>Created at</td>
					<td>Quick actions</td>
				</tr>
			</thead>
			<tbody>
				{myStreams.map(StreamRow)}
			</tbody>
		</table>
	</Box>
}

const StreamRow = (stream: Stream) => <tr key={stream._id}>
	<td><Link to={stream._id!}>{stream.title ?? stream.videoId ?? 'No id'}</Link></td>
	<td><TimeAgo datetime={stream.createdAt}/></td>
	<td>
		<Button>/</Button>
		<Button>/</Button>
	</td>
</tr>