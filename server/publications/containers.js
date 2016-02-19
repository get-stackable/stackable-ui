Meteor.publish('containers.all', function (appId) {
    //check only domain owners can get data
    let app = Application.findOne({_id: appId, 'users': this.userId});
    if (this.userId && app) {
        return Container.find({appId});
    } else {
        this.ready();
    }
});

Meteor.publish('containers.single', function (id) {
    //todo check only domain owners can get data
    //let app = Application.findOne({_id: appId, 'users': this.userId});
    if (this.userId) {
        return Container.find({_id: id});
    } else {
        this.ready();
    }
});
