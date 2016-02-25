Meteor.publish('containers.all', function (appId) {
    check(appId, String);

    //check only domain owners can get data
    let app = Application.findOne({
        _id: appId,
        'users': this.userId
    });

    if (this.userId && app) {
        return Container.find({appId: app._id}, {sort: {createdAt: -1}});
    } else {
        this.ready();
    }
});

Meteor.publish('containers.single', function (id) {
    check(id, String);
    let container = Container.findOne({_id: id});
    let app = Application.findOne({_id: container.appId, 'users': this.userId});

    //check only domain owners can get data
    if (this.userId && app) {
        return Container.find({_id: container._id});
    } else {
        this.ready();
    }
});

Meteor.publish('containers.find', function (query, limit) {
    //todo optimise and secure it
    //find by query
    let find = {};

    if (!_.isNull(query)) {
        let queryRegex = ".*" + query + ".*";
        find = {
            $or: [
                {
                    "name": {
                        $regex: queryRegex,
                        $options: 'i'
                    }
                }
            ]
        };
    }

    return Container.find(find, {sort: {createdAt: -1}})
});
