import { Mongo } from 'meteor/mongo';

export enum CueType {
	Text = 1
}

export interface CuePoint {
	_id?: string,
	time: number
	id: number
	type: CueType

	// The _id of the stream
	stream: string
}

export const CueTimeline = new Mongo.Collection<CuePoint>('cueTimeline')

