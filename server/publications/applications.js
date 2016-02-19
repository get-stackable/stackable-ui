Meteor.publish('apps.all', function () {
    if (this.userId) {
        return Application.find({'users': this.userId});
    } else {
        this.ready();
    }
});
