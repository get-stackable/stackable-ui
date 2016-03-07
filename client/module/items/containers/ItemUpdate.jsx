ItemUpdate = class ItemUpdate extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('items.single', this.props.id);

        var oid = new Meteor.Collection.ObjectID(this.props.id);
        let item = Item.findOne(oid);
        let data = {
            loading: !handle.ready()
        };

        if (handle.ready() && !_.isUndefined(item)) {
            data['item'] = item;
            data['container'] = Container.findOne({_id: item.containerId});
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
                handleSubmit={this.handleSubmit} />
        )
    }
};

reactMixin(ItemUpdate.prototype, ReactMeteorData);
