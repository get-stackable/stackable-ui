var createLibraryData = function (appId, libraryId) {
    check(appId, String);

    let library = ApplicationLibrary.findOne(libraryId);

    library.containers.map(function (container) {
        let data = {
            name: container.name,
            appId: appId,
            items: container.items
        };

        Meteor.call('container.create', data);
    });
};

var getNewKey = function () {
    return Random.id(12);
};

Meteor.methods({
    'app.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let user = User.findOne(this.userId);
        let libraryId = doc.libraryId;

        doc.users = [this.userId];
        doc.publicKey = getNewKey();
        doc.privateKey = getNewKey();
        doc.createdBy = this.userId;
        var app = new Application();
        app.set(doc);

        app.validate();
        if (app.hasValidationErrors()) {
            app.throwValidationException();
        }

        app.save();

        //add to domain to user collection
        user.push('apps', app._id);
        user.save();

        if (!_.isNull(libraryId)) {
            createLibraryData(app._id, libraryId);
        }

        return app;
    },
    'app.update': function (id, doc) {
        check(id, String);

        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let app = Application.findOne({_id: id, 'users': this.userId});

        //check if current user own this app
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        app.set(doc);

        app.validate();
        if (app.hasValidationErrors()) {
            app.throwValidationException();
        } else {
            app.save();
            return app;
        }
    },
    'app.generateKey': function (id) {
        check(id, String);

        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let app = Application.findOne({_id: id, 'users': this.userId});

        //check if current user own this app
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        app.set({
            publicKey: getNewKey(),
            privateKey: getNewKey()
        });

        app.save();
        return app;
    },
    'app.clone': function (id, doc) {
        check(id, String);

        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let app = Application.findOne({_id: id, 'users': this.userId});

        //check if current user own this app
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        //clone app
        let appCopy = new Application();
        appCopy.name = doc.name;
        appCopy.description = doc.description;
        appCopy.users = [this.userId];
        appCopy.publicKey = getNewKey();
        appCopy.privateKey = getNewKey();
        appCopy.save();

        //clone containers
        let containers = Container.find({appId: app._id}).fetch();
        containers.forEach((container) => {
            let containerCopy = new Container();
            containerCopy.name = container.name;
            containerCopy.items = container.items;
            containerCopy.appId = appCopy._id;
            containerCopy.save();
        });

        return appCopy;
    }
});
