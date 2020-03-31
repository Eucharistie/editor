import { Mongo } from 'meteor/mongo';

export interface Stream {
	_id?: string
	videoId?: string
	createdAt: Date
	editorIds: string[]
}

export const StreamsCollection = new Mongo.Collection<Stream>('streams');

StreamsCollection.allow({
	update(userId: string, doc: Stream, fieldNames: string[]) {
		if (doc.editorIds.includes(userId)) {
			if (fieldNames == ['videoId'] || fieldNames == ['editorIds']) return true
		}

		return false
	}
})