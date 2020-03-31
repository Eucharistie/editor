import React from 'react';
import { Router } from '@reach/router';
import { RouteComponentProps } from '@reach/router'
import { StreamOverview } from './overview'
import { StreamDetails } from './editor'
import { StreamsCollection } from '/imports/api/collections/Streams';

const RenderOverview = (_: RouteComponentProps) => <StreamOverview />

export function StreamsRouter() {
	return <Router>
		<RenderOverview path='/' />
		<StreamRouter path=':streamID' />
	</Router>
}

function RenderDetails(route: RouteComponentProps & {streamID?: string}) {
	const stream = StreamsCollection.findOne(route.streamID)
	if (stream) {
		return StreamDetails(stream)
	} else {
		return <p>Stream not found</p>
	}
}

export const StreamRouter = (_: RouteComponentProps) => <Router>
	<RenderDetails path="/" />
</Router>