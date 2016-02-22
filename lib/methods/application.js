var extractDomain = function (url) {
    let domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
};

var createLibraryData = function (appId, libraryId) {
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

Meteor.methods({
    'app.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let user = User.findOne(this.userId);
        let libraryId = doc.libraryId;

        doc.users = [this.userId];
        doc.url = doc.name;
        //doc.name = extractDomain(doc.url);
        doc.authKey = Random.id(5);
        var app = new Application();
        app.set(doc);
        app.save();

        //add to domain to user collection
        user.push('apps', app._id);
        user.save();

        if (!_.isNull(libraryId)) {
            createLibraryData(app._id, libraryId);
        }

        return app;

        //contentType.validate();
        //
        //if (contentType.hasValidationErrors()) {
        //    contentType.throwValidationException();
        //} else {
        //    contentType.save();
        //    return contentType;
        //}
    },
    'app.update': function (id, doc) {
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

        app.save();
        return app;

        //contentType.validate();
        //
        //if (contentType.hasValidationErrors()) {
        //    contentType.throwValidationException();
        //} else {
        //    contentType.save();
        //    return contentType;
        //}
    },
    'app.generateKey': function (id) {
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
            authKey: Random.id(5)
        });

        app.save();
        return app;
    },
    'app.clone': function (id, doc) {
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
        appCopy.url = doc.name;
        appCopy.authKey = Random.id(5);
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
