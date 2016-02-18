Meteor.methods({
    'entry.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
        }

        //check if current user own this domain
        let domain = Domain.findOne({_id: doc.domainId, 'users': this.userId});
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        let contentType = ContentType.findOne({slug: doc.type});

        let fieldsData = {};
        contentType.items.map((item) => {
            fieldsData[item.title] = '';
        });

        var entry = new Entry();
        entry.set({
            contentType: contentType.slug,
            contentTypeId: contentType._id,
            data: fieldsData,
            domainId: doc.domainId
        });

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
    'domain.delete': function (docId) {
        let domain = Domain.findOne({_id: docId, 'users': this.userId});

        //check if current user own this domain
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        //remove all related contentype
        ContentType.remove({domainId: domain._id});

        //remove all related entries
        Entry.remove({domainId: domain._id});

        return domain.remove();
    },
    'contentType.delete': function (docId) {
        var contentType = ContentType.findOne({_id: docId});

        //check if current user own this domain
        let domain = Domain.findOne({_id: contentType.domainId, 'users': this.userId});
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        //remove all related entries
        Entry.remove({contentTypeId: contentType._id});

        return contentType.remove();
    },
    'domain.addUser': function (domainId, userEmail) {
        let domain = Domain.findOne({_id: domainId, 'users': this.userId});

        //check if current user own this domain
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        let user = User.findOne({"emails.address" : userEmail});

        //if user not found
        //todo invite user to site
        if (_.isUndefined(user)) {
            throw new Meteor.Error('not-found', 'User not found, make sure user is registered.');
        }

        //add domain to user
        user.push('domains', domain._id);
        user.save();

        //add user id to domain
        domain.push('users', user._id);
        domain.save();

        return domain;
    },
    'domain.removeUser': function (domainId, userId) {
        let domain = Domain.findOne({_id: domainId, 'users': this.userId});
        let user = User.findOne({_id: userId});

        //check if current user own this domain
        if (_.isUndefined(domain)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this domain.');
        }

        //remove domain from user
        user.pull('domains', domain._id);
        user.save();

        //remove user id from domain
        domain.pull('users', user._id);
        domain.save();

        return domain;
    }
});
