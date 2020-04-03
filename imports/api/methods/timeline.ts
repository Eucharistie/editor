import { Meteor } from 'meteor/meteor'
import { CuePoint, CueTimeline } from '../collections/Timeline'
import { check } from 'meteor/check'
import { StreamsCollection } from '../collections/Streams'

const createCueMethodName = 'createCue'
const removeCueMethodName = 'removeCue'

Meteor.methods({
	[createCueMethodName](cue: CuePoint) {
		const creator = this.userId
		check(creator, String)
		check(cue.id, Number)
		check(cue.type, Number)
		check(cue.time, Number)
		check(cue.stream, String)
		const stream = StreamsCollection.findOne(cue.stream)
		if (stream == undefined || !stream.editorIds.includes(creator)) {
			throw new Meteor.Error("Cannot create cue", "You don't have access to the stream")
		} else if (CueTimeline.findOne({id: cue.id, stream: cue.stream})) {
			throw new Meteor.Error("Cannot create cue", `Text tag with id ${cue.id} is already tagged`)
		} else {
			CueTimeline.insert(cue)
		}
	},

	[removeCueMethodName](uid: string) {
		check(uid, String)
		check(this.userId, String)
		const cue = CueTimeline.findOne(uid)
		if (cue) {
			const stream = StreamsCollection.findOne(cue.stream)
			if (stream?.editorIds.includes(this.userId)) {
				CueTimeline.remove(uid)
			} else {
				throw new Meteor.Error('Cannot remove cue ' + uid, "You are not allowed to edit the stream")
			}
		} else {
			throw new Meteor.Error('Cannot remove cue ' + uid, "No cue exists with that id")
		}
	}
})

export function addCue(cue: CuePoint) {
	Meteor.call(createCueMethodName, cue)
}

export function removeCue(uid: string) {
	Meteor.call(removeCueMethodName, uid)
}