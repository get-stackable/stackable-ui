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

    if (!_.isNull(query)) {
        let queryRegex = ".*" + query + ".*";
        find = {
            $or: [
                {"data": {$regex: queryRegex, $options: 'i'}}
            ]
        };
    }

    return Item.find(find)
});
