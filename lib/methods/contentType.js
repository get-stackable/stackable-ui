Meteor.methods({
    'contentType.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        //check if current user own this domain
        let domain = Domain.findOne({_id: doc.domainId, 'users': this.userId});
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        var contentType = new ContentType();
        contentType.set(doc);

        contentType.save();
        return contentType;

        //contentType.validate();
        //
        //if (contentType.hasValidationErrors()) {
        //    contentType.throwValidationException();
        //} else {
        //    contentType.save();
        //    return contentType;
        //}
    },
    'contentType.update': function (id, doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let contentType = ContentType.findOne(id);

        //check if current user own this domain
        let domain = Domain.findOne({_id: contentType.domainId, 'users': this.userId});
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        contentType.set(doc);

        contentType.save();
        return contentType;

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
