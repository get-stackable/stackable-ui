Meteor.methods({
    'item.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        //check if current user own this app
        let app = Application.findOne({_id: doc.appId, 'users': this.userId});
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        let container = Container.findOne({_id: doc.containerId});

        //let fieldsData = {};
        //container.items.map((item) => {
        //    fieldsData[item.title] = '';
        //});

        var item = new Item();
        item.set({
            container: container.slug,
            containerId: container._id,
            data: doc.data,
            appId: app._id,
            ownerId: this.userId
        });

        item.validate();

        if (item.hasValidationErrors()) {
            item.throwValidationException();
        } else {
            item.save();
            return item;
        }
    },
    'item.update': function (id, data) {
        check(id, String);

        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let item = Item.findOne(id);

        //check if current user own this app
        let app = Application.findOne({_id: item.appId, 'users': this.userId});
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        item.set({data});

        item.validate();

        if (item.hasValidationErrors()) {
            item.throwValidationException();
        } else {
            item.save();
            return item;
        }
    },
    'item.delete': function (docId) {
        check(docId, String);

        var item = Item.findOne({_id: docId});

        //check if current user own this app
        let app = Application.findOne({_id: item.appId, 'users': this.userId});
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        return item.remove();
    }
});
