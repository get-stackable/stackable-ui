AppManage = class AppManage extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('containers.all', this.props.id);
        let handle2 = Meteor.subscribe('items.all', this.props.id);

        return {
            loading: !handle.ready(),
            containers: Container.find().fetch(),
            items: Item.find().fetch(),
            app: Application.findOne(this.props.id)
        };
    }

    componentDidMount() {
        Session.set('active.app', this.data.app.name);
    }

    componentDidUpdate() {
        Session.set('active.app', this.data.app.name);
    }

    deleteContainer(containerId) {
        Meteor.call('container.delete', containerId, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Container deleted successfully!');
            }
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
                <h2>Containers</h2>
                <ul>
                    {this.data.containers.map((type, index) => {
                        return (
                            <li key={index}>
                                <a href={FlowRouter.path('containerUpdate', {id: type._id})}>{type.name}</a>
                                - http://localhost:3000/api/items/{type.slug}?auth_key={this.data.app.authKey}
                                - <a onClick={() => this.deleteContainer(type._id)}>delete</a>
                            </li>
                        )
                    })}
                </ul>
                <a href={FlowRouter.path('containerCreate', {appId: this.props.id})}>Create container</a>
                <hr />

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

reactMixin(AppManage.prototype, ReactMeteorData);
