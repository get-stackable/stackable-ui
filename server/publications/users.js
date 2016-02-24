let allowedFields = {emails: 1, profile: 1};

Meteor.publish('user.data', function() {
    if (this.userId) {
        return User.find({_id: this.userId}, {fields: allowedFields});
    } else {
        this.ready();
    }
});

Meteor.publish('users.all', function (ids) {
    if (this.userId) {
        return User.find({_id: {$in: ids}}, {fields: allowedFields});
    } else {
        this.ready();
    }
});
