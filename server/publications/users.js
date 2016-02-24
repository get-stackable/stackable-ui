Meteor.publish('user.data', function() {
    if (this.userId) {
        return User.find({_id: this.userId});
    } else {
        this.ready();
    }
});

Meteor.publish('users.all', function (ids) {
    if (this.userId) {
        return User.find({_id: {$in: ids}});
    } else {
        this.ready();
    }
});
