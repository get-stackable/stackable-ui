ItemUpdate = class ItemUpdate extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('items.single', this.props.id);

        var oid = new Meteor.Collection.ObjectID(this.props.id);

        let user = User.findOne(Meteor.userId());

        let item;
        if (user.profile.isPaid) {
            item = Item.find(oid);
        } else {
            item = ItemFree.find(oid);
        }
        //let item = Item.findOne(oid);
        let data = {
            loading: true
        };

        if (handle.ready() && !_.isUndefined(item)) {
            let container = Container.findOne({_id: item.containerId});
            data['item'] = item;
            data['container'] = container;
            data['app'] = Application.findOne({_id: container.appId});

            let handle2 = Meteor.subscribe('items.all', container.appId, container._id);
            let handle3 = Meteor.subscribe('containers.all', container.appId);
            if (handle2.ready() && handle3.ready()) {
                if (user.profile.isPaid) {
                    data['allItems'] = Item.find({containerId: container._id}, {sort: {createdAt: -1}}).fetch();
                } else {
                    data['allItems'] = ItemFree.find({containerId: container._id}, {sort: {createdAt: -1}}).fetch();
                }
                data['allContainers'] = Container.find({appId: container.appId}, {sort: {createdAt: -1}}).fetch();
                data['loading'] = false;
            }
        }

        return data;
    }

    handleSubmit = (data) => {
        Meteor.call('item.update', this.data.item._id, data, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Item updated successfully!');
            }
        });
    };

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return (
            <ItemUpdateForm
                item={this.data.item}
                container={this.data.container}
                allItems={this.data.allItems}
                allContainers={this.data.allContainers}
                app={this.data.app}
                handleSubmit={this.handleSubmit} />
        )
    }
};

reactMixin(ItemUpdate.prototype, ReactMeteorData);
