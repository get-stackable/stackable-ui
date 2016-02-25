Accounts.onCreateUser(function(options, user) {
    user.apps = [];
    user.profile = {};

    if (!_.isUndefined(user.services) && !_.isUndefined(user.services.google)) {
        user.emails = [{
            address: [user.services.google.email]
        }];
        user.profile.first_name = user.services.google.given_name;
        user.profile.last_name = user.services.google.family_name;
    }

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
