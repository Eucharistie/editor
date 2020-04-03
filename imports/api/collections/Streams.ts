import { Mongo } from 'meteor/mongo';

export interface Stream {
	_id?: string
	videoId?: string
	title?: string
	createdAt: Date
	editorIds: string[]
	text?: any,
	tagFrom: number,
}

export const StreamsCollection = new Mongo.Collection<Stream>('streams');
export const streamWithCuesPublication = 'Stream with Cues'

const textUpdateFields = new Set(['text', 'tagFrom'])

StreamsCollection.allow({
	update(userId: string, doc: Stream, fieldNames: string[]) {
		if (doc.editorIds.includes(userId)) {
			if (fieldNames.length == 1) {
				const field = fieldNames[0]
				return ['editorIds', 'videoId', 'title'].includes(field)
			} else if (fieldNames.length == 2) {
				return textUpdateFields.has(fieldNames[0]) && textUpdateFields.has(fieldNames[1])
			}
		}

		return false
	},

	remove(userId: string, doc: Stream) {
		return doc.editorIds.includes(userId);

	}
})