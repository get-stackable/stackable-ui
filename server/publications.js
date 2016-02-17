Meteor.publish('domains.all', function() {
    if (this.userId) {
        return Domain.find({'users': this.userId});
    } else {
        this.ready();
    }
});

Meteor.publish('contentType.all', function(domainId) {
    //check only domain owners can get data
    let domain = Domain.findOne({_id: domainId, 'users': this.userId});
    if (this.userId && domain) {
      return ContentType.find({domainId: domainId});
    } else {
        this.ready();
    }
});

Meteor.publish('contentType.single', function(id) {
    //check only domain owners can get data
    let domain = Domain.findOne({_id: domainId, 'users': this.userId});
    if (this.userId && domain) {
      return ContentType.find({_id: id});
    } else {
        this.ready();
    }
});

Meteor.publish('entries.all', function(domainId) {
  //check only domain owners can get data
  let domain = Domain.findOne({_id: domainId, 'users': this.userId});
  if (this.userId && domain) {
    return Entry.find({domainId: domainId});
  } else {
      this.ready();
  }
});

Meteor.publish('entry.single', function(id) {
  ///check only domain owners can get data
  let domain = Domain.findOne({_id: domainId, 'users': this.userId});
  if (this.userId && domain) {
    return Entry.find({_id: id});
  } else {
      this.ready();
  }
});
