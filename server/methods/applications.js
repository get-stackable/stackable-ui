Meteor.methods({
    'app.delete': function (docId) {
        check(docId, String);

        let app = Application.findOne({_id: docId, 'users': this.userId});

        //check if current user own this app
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this stack.');
        }

        //remove all related containers
        Container.remove({appId: app._id});

        //remove all related items
        Item.remove({appId: app._id});

        return app.remove();
    },
    'app.addUser': function (appId, userEmail) {
        check(appId, String);

        //todo check if user already admin
        let app = Application.findOne({_id: appId, 'users': this.userId});

        //check if current user own this app
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this stack.');
        }

        let user = User.findOne({"emails.address" : userEmail});

        //if user not found
        //todo invite user to site
        if (_.isUndefined(user)) {
            throw new Meteor.Error('not-found', 'User not found, make sure user is registered.');
        }

        //add domain to user
        user.push('apps', app._id);
        user.save();

        //add user id to app
        app.push('users', user._id);
        app.save();

        return app;
    },
    'app.removeUser': function (appId, userId) {
        check(appId, String);

        let app = Application.findOne({_id: appId, 'users': this.userId});
        let user = User.findOne({_id: userId});

        //check if current user own this app
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this stack.');
        }

        //stack owner cannot be deleted
        if (user._id === app.createdBy) {
            throw new Meteor.Error('not-allowed', 'You cannot remove owner of the stack.');
        }

        //remove domain from user
        user.pull('apps', app._id);
        user.save();

        //remove user id from domain
        app.pull('users', user._id);
        app.save();

        return app;
    }
});
