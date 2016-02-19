//ItemsList
ItemsList = class ItemsList extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('items.all', this.props.appId);
        let handle2 = Meteor.subscribe('containers.all', this.props.appId);

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
            <div className="ui grid full-height" style={{'marginLeft': '0'}}>
                <div className="two wide column side-sub-menu">
                    <SideSubMenu
                        heading="Items"
                        buttonText="+ create item"
                        buttonLink="#" />
                </div>
                <div className="fourteen wide column" style={{'paddingLeft': '0'}}>
                    <div className="content-wrapper">
                        <div className="ui grid padding35">
                            <div className="sixteen wide column">
                                <table className="ui celled table" style={{'marginTop': '15px'}}>
                                    <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.data.items.map((item) => {
                                        let dataKeys = _.keys(item.data);
                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <a href={FlowRouter.path('itemUpdate', {type: item.container, id: item._id})}>
                                                        {item.data[dataKeys[0]]}
                                                    </a>
                                                </td>
                                                <td>
                                                    http://localhost:3000/api/items/{item.container}/{item._id}?auth_key={this.data.app.authKey}
                                                </td>
                                                <td>
                                                    <a
                                                        className="mini negative ui button"
                                                        onClick={() => this.deleteItem(item._id)}>
                                                        delete
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                <hr />
                                {this.data.containers.map((type, index) => {
                                    return (
                                        <a
                                            href={FlowRouter.path('itemCreate', {type: type.slug, appId: this.props.appId})}
                                            key={index}>Create {type.name} - </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(ItemsList.prototype, ReactMeteorData);
