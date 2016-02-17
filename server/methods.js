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

        let contentType =  ContentType.findOne({slug: doc.type});

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
    }
});
