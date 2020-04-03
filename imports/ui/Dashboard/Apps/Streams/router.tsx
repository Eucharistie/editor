import React from 'react';
import {
	Link,
	Router
} from '@reach/router';
import { RouteComponentProps } from '@reach/router'
import { StreamOverview } from './overview'
import { StreamDetails } from './editor'
import {
	Stream,
	StreamsCollection
} from '/imports/api/collections/Streams';
import {useTracker} from "meteor/react-meteor-data";
import {SyncLive} from "/imports/ui/Dashboard/Apps/Streams/syncLive";
import {SyncRecording} from "/imports/ui/Dashboard/Apps/Streams/syncRecording";
import { Viewer } from './viewer';

const RenderOverview = (_: RouteComponentProps) => <StreamOverview />

export function StreamsRouter() {
	return <Router>
		<RenderOverview path='/' />
		<StreamRouter path=':streamID/*' />
	</Router>
}

function StreamRouter(route: RouteComponentProps & {streamID?: string}) {
	const stream = useTracker(() => {
		return StreamsCollection.findOne(route.streamID)
	}, [])

	if (stream == undefined) return <p>Stream not found. <Link to='../'>Go to overview</Link></p>

	return <Router>
		<RenderDetails stream={stream} path='/' />
		<RenderSyncLive stream={stream} path='live' />
		<RenderSyncRecording stream={stream} path='recording' />
		<RenderViewer stream={stream} path='viewer' />
	</Router>
}

const RenderDetails = (props: StreamRoute) => <StreamDetails stream={props.stream} />
const RenderSyncLive = (props: StreamRoute) => <SyncLive stream={props.stream} />
const RenderSyncRecording = (props: StreamRoute) => <SyncRecording stream={props.stream} />
const RenderViewer = (props: StreamRoute) => <Viewer stream={props.stream}/>

interface StreamRoute extends RouteComponentProps{
	stream: Stream
}