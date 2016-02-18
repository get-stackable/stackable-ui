let extractDomain = function (url) {
    let domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
};

Meteor.methods({
    'domain.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let user = User.findOne(this.userId);

        doc.users = [this.userId];
        doc.url = doc.name;
        //doc.name = extractDomain(doc.url);
        doc.authKey = Random.id(5);
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
    },
    'domain.update': function (id, doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        let domain = Domain.findOne({_id: id, 'users': this.userId});

        //check if current user own this domain
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        domain.set(doc);

        domain.save();
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
