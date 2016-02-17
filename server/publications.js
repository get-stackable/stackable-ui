Meteor.publish('contentType.all', function() {
    return ContentType.find();
});

Meteor.publish('entries.all', function() {
    return Entry.find();
});

Meteor.publish('entry.single', function(id) {
    return Entry.find({_id: id});
});
