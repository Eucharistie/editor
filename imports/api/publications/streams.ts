import {Meteor} from "meteor/meteor";
import {
    StreamsCollection,
    streamWithCuesPublication
} from "/imports/api/collections/Streams";
import { check } from "meteor/check";
import {CueTimeline} from "/imports/api/collections/Timeline";

// Publish the users owned streams with basic metadata
Meteor.publish(null, function () {
    return StreamsCollection.find(
        {editorIds: this.userId},
        {fields: {
            videoId: 1,
            createdAt: 1,
            title: 1,
            editorIds: 1
        }}
    )
})

Meteor.publish(streamWithCuesPublication, function(streamId) {
    check(streamId, String)
    const text = StreamsCollection.find(streamId)
    if (text.count() == 0) {
        throw new Meteor.Error('Cannot subsribe to stream '+streamId, 'No such stream exists')
    }
    const streamTimeline = CueTimeline.find({stream: streamId})

    return [text, streamTimeline]
})