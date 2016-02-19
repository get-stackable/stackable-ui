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

        let container = Container.findOne({slug: doc.type});

        let fieldsData = {};
        container.items.map((item) => {
            fieldsData[item.title] = '';
        });

        var item = new Item();
        item.set({
            container: container.slug,
            containerId: container._id,
            data: fieldsData,
            appId: doc.appId
        });

        item.save();
        return item;

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
