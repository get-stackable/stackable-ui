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

        let activeContainer = {};
        if (!_.isUndefined(FlowRouter.getQueryParam('containerId'))) {
            find['containerId'] = FlowRouter.getQueryParam('containerId');
            activeContainer = Container.findOne({_id: FlowRouter.getQueryParam('containerId')})
        }

        return {
            loading: !handle.ready() || !handle2.ready(),
            items: Item.find(find, {sort: {createdAt: -1}}).fetch(),
            containers: Container.find({}, {sort: {createdAt: -1}}).fetch(),
            app: Application.findOne(this.props.appId),
            container: activeContainer
        };
    }

    componentDidMount() {
        Session.set('active.app', {
            id: this.data.app._id,
            name: this.data.app.name
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
                            {this.data.container.name}'s Items
                        </h3>
                        <a
                            className="ui orange button item"
                            href={FlowRouter.path('itemCreate', {containerId: this.data.container._id})}>
                            + create item
                        </a>
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
                                            return <ItemsListRow key={item._id} item={item} app={this.data.app} />
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
