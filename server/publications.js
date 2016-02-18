Meteor.publish('apps.all', function () {
    if (this.userId) {
        return Application.find({'users': this.userId});
    } else {
        this.ready();
    }
});

Meteor.publish('users.all', function (ids) {
    if (this.userId) {
        return User.find({_id: { $in: ids}});
    } else {
        this.ready();
    }
});

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

Meteor.publish('items.all', function (appId) {
    //check only app owners can get data
    let domain = Application.findOne({_id: appId, 'users': this.userId});
    if (this.userId && domain) {
        return Item.find({appId});
    } else {
        this.ready();
    }
});

Meteor.publish('items.single', function (id) {
    //todo check only app owners can get data
    //let app = Application.findOne({_id: appId, 'users': this.userId});

    let item = Item.findOne({_id: id});
    if (this.userId) {
        return [
            Container.find({_id: item.containerId}),
            Item.find({_id: id})
        ];
    } else {
        this.ready();
    }
});

Meteor.publish('items.find', function (query, limit) {
    //find by query
    let find = {};

    //if (!_.isNull(query)) {
    //    let queryRegex = ".*" + query + ".*";
    //    find = {
    //        $or: [
    //            {"data": {$regex: queryRegex, $options: 'i'}}
    //        ]
    //    };
    //}

    return Item.find(find, limit)
});
