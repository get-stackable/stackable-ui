Meteor.methods({
    'entry.update': function (id, doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            //throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let entry = Entry.findOne(id);
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
    }
});
