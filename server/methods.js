Meteor.methods({
    'entry.create': function (doc) {
        if (_.isNull(this.userId)) {
            //if not logged in
            throw new Meteor.Error('not-logged-in', 'Please login to continue.');
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
          dataSchema: contentType.items,
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
