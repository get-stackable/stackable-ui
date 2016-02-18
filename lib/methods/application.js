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

var createDummyAppData = function (appId) {
    //create blog
    let blogData = {
        name: 'Blog',
        appId: appId,
        items: [{
            name: 'Title',
            type: 'text',
            required: true
        }, {
            name: 'Content',
            type: 'textArea'
        }, {
            name: 'Published',
            type: 'boolean'
        }]
    };

    Meteor.call('container.create', blogData);
};

Meteor.methods({
    'app.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let user = User.findOne(this.userId);

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

        createDummyAppData(app._id);

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
    }
});
