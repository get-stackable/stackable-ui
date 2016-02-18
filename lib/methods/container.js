Meteor.methods({
    'container.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        //check if current user own this app
        let app = Application.findOne({_id: doc.appId, 'users': this.userId});
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        var container = new Container();
        container.set(doc);

        container.save();
        return container;

        //contentType.validate();
        //
        //if (contentType.hasValidationErrors()) {
        //    contentType.throwValidationException();
        //} else {
        //    contentType.save();
        //    return contentType;
        //}
    },
    'container.update': function (id, doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let container = Container.findOne(id);

        //check if current user own this domain
        let app = Application.findOne({_id: container.appId, 'users': this.userId});
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        container.set(doc);

        container.save();
        return container;

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
