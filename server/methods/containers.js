Meteor.methods({
    'container.delete': function (docId) {
        check(docId, String);

        var container = Container.findOne({_id: docId});

        //check if current user own this app
        let app = Application.findOne({_id: container.appId, 'users': this.userId});
        if (_.isUndefined(app)) {
            throw new Meteor.Error('not-allowed', 'You are not allowed to manage this app.');
        }

        //remove all related entries
        ItemPaid.remove({containerId: container._id});
        ItemFree.remove({containerId: container._id});

        return container.remove();
    },
    'container.field.archive': function (containerId, fieldName) {
        let user = User.findOne(this.userId);
        let Item = user.isPaid ? ItemPaid : ItemFree;

        let items = Item.find({containerId}).fetch();
        async.each(items, function(item, callback) {
            let data = item.data;
            let dataArchive = !_.isUndefined(item.dataArchive) ? item.dataArchive : {};

            //copy to archive
            dataArchive[fieldName] = data[fieldName];
            //remove from data
            delete data[fieldName];

            item.set({data, dataArchive});
            if (item.validate()) {
                item.save();
                callback();
            } else {
                callback('Unable to archive');
            }
        }, function(err){
            // if any of the file processing produced an error, err would equal that error
            if( err ) {
                throw new Meteor.Error('not-possible', 'Unable to archive fields data.');
            } else {
                //todo better Promise callback
                console.log('All items have been processed successfully');
            }
        });
    },
    'container.field.rename': function (containerId, oldName, newName) {
        let user = User.findOne(this.userId);
        let Item = user.isPaid ? ItemPaid : ItemFree;

        let items = Item.find({containerId}).fetch();

        async.each(items, function(item, callback) {
            let data = item.data;

            //copy with new key
            data[newName] = data[oldName];
            //remove with old key
            delete data[oldName];

            item.set({data});
            if (item.validate()) {
                item.save();
                callback();
            } else {
                callback('Unable to rename data');
            }
        }, function(err){
            // if any of the file processing produced an error, err would equal that error
            if( err ) {
                throw new Meteor.Error('not-possible', 'Unable to rename fields data.');
            } else {
                //todo better Promise callback
                console.log('All items have been processed successfully');
            }
        });
    }
});
