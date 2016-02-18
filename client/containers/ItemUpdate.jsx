ItemUpdate = class ItemUpdate extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('items.single', this.props.id);

        let item = Item.findOne(this.props.id);
        let data = {
            loading: !handle.ready()
        };

        if (handle.ready() && !_.isUndefined(item)) {
            data['item'] = item;
            data['container'] = Container.findOne({_id: item.containerId});
        }

        return data;
    }

    render() {
        if (this.data.loading) {
            return <div>loading...</div>
        }

        return (
            <ItemUpdateForm
                item={this.data.item}
                container={this.data.container}/>
        )
    }
};

reactMixin(ItemUpdate.prototype, ReactMeteorData);
