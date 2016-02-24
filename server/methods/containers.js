Meteor.methods({
    'container.delete': function (docId) {
        check(docId, String);

        var container = Container.findOne({_id: docId});

        //check if current user own this app
        let app = Application.findOne({_id: container.appId, 'users': this.userId});
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        //remove all related entries
        Item.remove({containerId: container._id});

        return container.remove();
    }
});
