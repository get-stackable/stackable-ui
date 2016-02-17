Meteor.publish('domains.all', function() {
    if (this.userId) {
        let user = User.findOne(this.userId);
        return Domain.find({'_id':{'$in': user.domains}});
    } else {
        this.ready();
    }
});

Meteor.publish('contentType.all', function(domainId) {
  //todo only domain owners can get
    return ContentType.find({domainId: domainId});
});

Meteor.publish('contentType.single', function(id) {
  //todo only domain owners can get
    return ContentType.find({_id: id});
});

Meteor.publish('entries.all', function(domainId) {
  //todo only domain owners can get
    return Entry.find({domainId: domainId});
});

Meteor.publish('entry.single', function(id) {
  //todo only domain owners can get
    return Entry.find({_id: id});
});
