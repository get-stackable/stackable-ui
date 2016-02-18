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

        //check if container with same name already exists
        let checkContainer = Container.findOne({appId: doc.appId, 'name': doc.name});
        if (!_.isUndefined(checkContainer)) {
            throw new Meteor.Error('not-allowed', 'Container with same name already exists.');
        }

        var container = new Container();
        container.set(doc);

        container.validate();

        if (container.hasValidationErrors()) {
            container.throwValidationException();
        } else {
            container.save();
            return container;
        }
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

        container.validate();

        if (container.hasValidationErrors()) {
            container.throwValidationException();
        } else {
            container.save();
            return container;
        }
    }
});
