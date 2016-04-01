Accounts.onCreateUser(function(options, user) {
    user.apps = [];
    user.profile = {
        first_name: '',
        last_name: ''
    };
    user.isPaid = false;
    user.isActive = true;
    user.referral = {
        wasReferred: false,
        balance: 0,
        referrals: [],
        key: Random.id(5)
    };

    if (!_.isUndefined(user.services) && !_.isUndefined(user.services.google)) {
        user.emails = [{
            address: [user.services.google.email]
        }];
        user.profile.first_name = user.services.google.given_name;
        user.profile.last_name = user.services.google.family_name;
    }

    //subscribe to mailchimp
    Meteor.call('mailchimp.subscribe', user.emails[0].address);

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
    },
    'mailchimp.subscribe': function (email) {
        var mailingLists = new MailChimpLists();

        mailingLists.subscribe({
            id: Meteor.settings.private.MailChimp.listId,
            email: {'email': email}
        }, (err) => {
            if (err) {
                console.log('mailchimp:', err);
            }
        });
    },
    'pay.referral': function (key) {
        let commission = SiteSettings.referralCommission;
        let currentUser = User.findOne(this.userId);

        //get referrer
        let referrerUser = User.findOne({'referral.key': key});

        //check if current user already got paid for referral signup
        if (currentUser.referral.wasReferred || referrerUser._id === currentUser._id) {
            throw new Meteor.Error('not-allowed', 'You have already earned your referral payment.');
        }

        if (referrerUser.referral.balance >= 100) {
            throw new Meteor.Error('not-allowed', 'Referrer is not allowed to earn more credits.');
        }

        //now pay referrer and current user both
        referrerUser.push({
            'referral.referrals': currentUser._id
        });
        referrerUser.inc('referral.balance', commission);

        referrerUser.save();

        //now pay referrer and current user both
        currentUser.set({
            'referral.wasReferred': true,
            'referral.referredBy': referrerUser._id
        });
        currentUser.inc('referral.balance', commission);

        currentUser.save();

        return currentUser;
    }
});
