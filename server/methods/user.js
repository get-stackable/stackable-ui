Accounts.onCreateUser(function(options, user) {
    user.apps = [];

    return user;
});

Meteor.methods({
    'user.update': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let user = User.findOne(this.userId);

        user.set(doc);

        user.validate();

        if (user.hasValidationErrors()) {
            user.throwValidationException();
        } else {
            user.save();
            return user;
        }
    }
});
