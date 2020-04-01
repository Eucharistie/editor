import React from 'react';
import { Router } from '@reach/router';
import { RouteComponentProps } from '@reach/router'
import { StreamOverview } from './overview'
import { StreamDetails } from './editor'
import { StreamsCollection } from '/imports/api/collections/Streams';
import {useTracker} from "meteor/react-meteor-data";

const RenderOverview = (_: RouteComponentProps) => <StreamOverview />

export function StreamsRouter() {
	return <Router>
		<RenderOverview path='/' />
		<RenderDetails path=':streamID' />
	</Router>
}

const RenderDetails = (route: RouteComponentProps & {streamID?: string}) => {
	const stream = useTracker(() => {
		return StreamsCollection.findOne(route.streamID)
	}, [])

	if (stream) {
		return <StreamDetails stream={stream} />
	}

	return <p>Stream not found</p>
}