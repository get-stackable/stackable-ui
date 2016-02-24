Meteor.methods({
    'item.update': function (id, doc) {
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

        item.set({data: doc});

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
