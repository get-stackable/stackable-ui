let extractDomain = function (url) {
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

        //check if current user own this domain
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
    }
});
