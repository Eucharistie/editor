import { Meteor } from "meteor/meteor";
import { StreamsCollection } from "../collections/Streams";
import { check } from 'meteor/check'

const createStreamMethodName = 'createStream';

Meteor.methods({
	[createStreamMethodName]() {
		const userId = Meteor.userId()
		check(userId, String)
		
		if (userId) {
			return StreamsCollection.insert(
				{
					createdAt: new Date(),
					editorIds: [userId],
					tagFrom: 0
				}
			)
		}
	}
})

export function createStream(callback: (error: Error, id: string) => void) {
	Meteor.call(createStreamMethodName, callback)
}