Meteor.methods({
    'entry.update': function (id, doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let entry = Entry.findOne(id);

        //check if current user own this domain
        let domain = Domain.findOne({_id: entry.domainId, 'users': this.userId});
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        entry.set({data: doc});

        entry.save();
        return entry;

        //contentType.validate();
        //
        //if (contentType.hasValidationErrors()) {
        //    contentType.throwValidationException();
        //} else {
        //    contentType.save();
        //    return contentType;
        //}
    },
    'entry.delete': function (docId) {
        var entry = Entry.findOne({_id: docId});

        //check if current user own this domain
        let domain = Domain.findOne({_id: entry.domainId, 'users': this.userId});
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        return entry.remove();
    }
});
