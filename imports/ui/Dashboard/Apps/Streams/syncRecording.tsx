import React from 'react'
import {Stream} from "/imports/api/collections/Streams";

export const SyncRecording = (props: {stream: Stream}) => <h1>Sync Recording {props.stream.title ?? props.stream._id ?? 'No ID'}</h1>