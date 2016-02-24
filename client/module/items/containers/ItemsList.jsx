ItemsList = class ItemsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: null
        };
    }

    getMeteorData() {
        let handle = Meteor.subscribe('items.all', this.props.appId);
        let handle2 = Meteor.subscribe('containers.all', this.props.appId);

        let find = {};
        if (!_.isNull(this.state.query)) {
            let queryRegex = ".*" + this.state.query + ".*";
            find = {
                $or: [
                    {"tags": {$regex: queryRegex, $options: 'i'}}
                ]
            };
        }
        if (!_.isUndefined(FlowRouter.getQueryParam('containerId'))) {
            find['containerId'] = FlowRouter.getQueryParam('containerId');
        }

        return {
            loading: !handle.ready() || !handle2.ready(),
            items: Item.find(find).fetch(),
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

    //componentDidUpdate() {
    //    Session.set('active.app', {
    //        id: this.data.app._id,
    //        name: this.data.app.name
    //    });
    //}

    deleteItem(itemId) {
        Meteor.call('item.delete', itemId, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Item deleted successfully!');
            }
        });
    }

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return (
            <div className="ui grid full-height" style={{'marginLeft': '0'}}>
                <div className="two wide column side-sub-menu">
                    <div className="ui left vertical menu">
                        <h3 className="ui header item">
                            Items
                        </h3>

                        <h4 className="ui header item">
                            Create Item:
                        </h4>
                        {this.data.containers.map((container) => {
                            return (
                                <a
                                    key={container._id}
                                    className="ui button item"
                                    href={FlowRouter.path('itemCreate', {containerId: container._id})}>
                                    + create {container.name}
                                </a>
                            )
                        })}

                        <div className="item"></div>
                    </div>
                </div>
                <div className="fourteen wide column" style={{'paddingLeft': '0'}}>
                    <div className="content-wrapper">
                        <div className="ui grid">
                            <div className="sixteen wide column">
                                <SearchItemsForm
                                    containers={this.data.containers}
                                    doSearch={(query) => this.setState({query})}/>
                            </div>
                            <div className="sixteen wide column padding35">
                                {this.data.items.length === 0 ?
                                    <div className="ui segment">
                                        <p>No items found.</p>
                                    </div>
                                :
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
                                                        <a href={FlowRouter.path('itemUpdate', {id: item._id})}>
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
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(ItemsList.prototype, ReactMeteorData);
