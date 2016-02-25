Meteor.publish('apps.all', function () {
    if (this.userId) {
        return Application.find({'users': this.userId}, {sort: {createdAt: -1}});
    } else {
        this.ready();
    }
});

Meteor.publish('apps.libraries.all', function () {
    return ApplicationLibrary.find({'isActive': true}, {sort: {createdAt: -1}});
});
