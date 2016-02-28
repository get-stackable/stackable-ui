ContainersList = class ContainersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: null
        };
    }

    getMeteorData() {
        let handle = Meteor.subscribe('containers.all', this.props.appId);

        let find = {};
        if (!_.isNull(this.state.query)) {
            let queryRegex = ".*" + this.state.query + ".*";
            find = {
                $or: [
                    {"name": {$regex: queryRegex, $options: 'i'}}
                ]
            };
        }

        return {
            loading: !handle.ready(),
            containers: Container.find(find, {sort: {createdAt: -1}}).fetch(),
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

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return (
            <div className="ui grid full-height" style={{'marginLeft': '0'}}>
                <div className="two wide column side-sub-menu">
                    <div className="ui left vertical menu">
                        <h3 className="ui header item">
                            Containers
                        </h3>
                        <a className="ui orange button item" href={FlowRouter.path('containerCreate', {appId: this.props.appId})}>
                            + create container
                        </a>
                        <div className="item"></div>
                    </div>
                </div>
                <div className="fourteen wide column" style={{'paddingLeft': '0'}}>
                    <div className="content-wrapper">
                        <div className="ui grid">
                            <div className="sixteen wide column">
                                <SearchContainersForm
                                    doSearch={(query) => this.setState({query})}/>
                            </div>
                            <div className="sixteen wide column padding35">
                                {this.data.containers.length === 0 ?
                                    <div className="ui segment">
                                        <p>No containers found.</p>
                                    </div>
                                :
                                    <table className="ui celled table" style={{'marginTop': '15px'}}>
                                        <thead>
                                        <tr>
                                            <th>Container Name</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.data.containers.map((container) => {
                                            return (
                                                <tr key={container._id}>
                                                    <td>
                                                        <a href={FlowRouter.path('containerUpdate', {id: container._id})}>{container.name}</a>
                                                    </td>
                                                    <td>
                                                        <a href={StackableApi.getContainerItems(this.data.app.publicKey, container._id)} target="_blank" title="Get container items API URL">
                                                            <i className="share icon"></i>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a
                                                            className="mini ui button"
                                                            href={FlowRouter.path('itemsList', {appId: this.props.appId}, {containerId: container._id})}>
                                                            items
                                                        </a>
                                                        <a
                                                            className="mini secondary ui button"
                                                            href={FlowRouter.path('containerUpdate', {id: container._id})}>
                                                            modify
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

reactMixin(ContainersList.prototype, ReactMeteorData);
