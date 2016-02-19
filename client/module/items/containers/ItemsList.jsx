//ItemsList
ItemsList = class ItemsList extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('items.all', this.props.appId);
        let handle2 = Meteor.subscribe('containers.all', this.props.id);

        return {
            loading: !handle.ready(),
            items: Item.find().fetch(),
            containers: Container.find().fetch(),
            app: Application.findOne(this.props.appId)
        };
    }

    componentDidMount() {
        Session.set('active.app', {
            id: this.data.app._id,
            name: this.data.app.name
        });
    }

    componentDidUpdate() {
        Session.set('active.app', {
            id: this.data.app._id,
            name: this.data.app.name
        });
    }

    deleteItem(itemId) {
        Meteor.call('item.delete', itemId, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Item deleted successfully!');
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Items</h2>
                <ul>
                    {this.data.items.map((entry, index) => {
                        let dataKeys = _.keys(entry.data);
                        return (
                            <li key={index}>
                                <a href={FlowRouter.path('itemUpdate', {type: entry.container, id: entry._id})}>{entry.data[dataKeys[0]]}</a>
                                - http://localhost:3000/api/items/{entry.container}/{entry._id}?auth_key={this.data.app.authKey}
                                - <a onClick={() => this.deleteItem(entry._id)}>delete</a>
                            </li>
                        )
                    })}
                </ul>
                {this.data.containers.map((type, index) => {
                    return (
                        <a
                            href={FlowRouter.path('itemCreate', {type: type.slug, appId: this.props.id})}
                            key={index}>Create {type.name} - </a>
                    )
                })}
            </div>
        )
    }
};

reactMixin(ItemsList.prototype, ReactMeteorData);
