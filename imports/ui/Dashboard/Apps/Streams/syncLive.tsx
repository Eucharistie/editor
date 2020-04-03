import React from 'react'
import {Stream} from "/imports/api/collections/Streams";

export const SyncLive = (props: {stream: Stream}) => <h1>Sync live {props.stream.title ?? props.stream._id ?? 'No ID'}</h1>