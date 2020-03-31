import { Mongo } from 'meteor/mongo';

export interface Stream {
	_id?: string
	videoId?: string
	createdAt: Date
	editorIds: string[]
	text?: any
}

export const StreamsCollection = new Mongo.Collection<Stream>('streams');

StreamsCollection.allow({
	update(userId: string, doc: Stream, fieldNames: string[]) {
		if (doc.editorIds.includes(userId)) {
			if (fieldNames.length == 1) {
				const field = fieldNames[0]
				return ['editorIds', 'text', 'videoId'].includes(field)
			}
		}

		return false
	}
})