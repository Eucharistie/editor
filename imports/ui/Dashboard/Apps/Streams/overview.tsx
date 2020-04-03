import React from 'react';
import {
	Box,
	Button,
	StyledOcticon
} from '@primer/components';
import { Plus } from '@primer/octicons-react'
import { paddedContainer} from '/imports/ui/style'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {
	StreamsCollection,
	Stream
} from '/imports/api/collections/Streams';
import { createStream } from '/imports/api/methods/streams';
import TimeAgo from 'timeago-react'
import {
	Link,
	navigate
} from '@reach/router'


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
		createStream(function(error, streamId) {
			if (error) {console.error(error)}
			else {
				navigate('/dashboard/streams/' + streamId)
			}
		})
	}

	return <Box {...paddedContainer} marginTop={2}>
		<Button onClick={addStream}>Add stream <StyledOcticon icon={Plus} marginLeft={1}/></Button>
		<Box marginTop={2}>
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