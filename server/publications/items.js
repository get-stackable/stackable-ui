Meteor.publish('items.all', function (appId, containerId) {
    check(appId, String);
    let itemFind = {};
    let options = {sort: {createdAt: -1}};

    let user = User.findOne(this.userId);

    if (!_.isUndefined(containerId)) {
        check(containerId, String);
        itemFind['containerId'] = containerId;
    }

    //check only app owners can get data
    let app = Application.findOne({_id: appId, 'users': this.userId});
    itemFind['appId'] = app._id;

    if (this.userId && app) {
        console.log('is paid', user.profile.isPaid);
        if (user.profile.isPaid) {
            return Item.find(itemFind, options);
        } else {
            return ItemFree.find(itemFind, options);
        }
    } else {
        this.ready();
    }
});

Meteor.publish('items.single', function (id) {
    //check(id, String);
    var oid = new Meteor.Collection.ObjectID(id);

    let user = User.findOne(this.userId);

    let item;
    if (user.profile.isPaid) {
        item = Item.findOne({_id: oid});
    } else {
        item = ItemFree.findOne({_id: oid});
    }
    let app = Application.findOne({_id: item.appId, 'users': this.userId});

    //check only app owners can get data
    if (this.userId && app) {
        if (user.profile.isPaid) {
            return [
                Container.find({_id: item.containerId}),
                Item.find({_id: item._id})
            ];
        } else {
            return [
                Container.find({_id: item.containerId}),
                ItemFree.find({_id: item._id})
            ];
        }

    } else {
        this.ready();
    }
});

Meteor.publish('items.find', function (query, limit) {
    //todo optimise and secure it
    //find by query
    let find = {};

    let user = User.findOne(this.userId);
    find['appId'] = {$in: user.apps};

    if (!_.isNull(query)) {
        let queryRegex = ".*" + query + ".*";
        find = {
            $or: [
                {"tags": {$regex: queryRegex, $options: 'i'}}
            ]
        };
    }

    //todo set limit
    return Item.find(find, {sort: {createdAt: -1}});
});
