Meteor.methods({
    'domain.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let user = User.findOne(this.userId);

        doc.users = [this.userId];
        var domain = new Domain();
        domain.set(doc);
        domain.save();

        //add to domain to user collection
        user.push('domains', domain._id);
        user.save();

        return domain;

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
