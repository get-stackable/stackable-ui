ContainersList = class ContainersList extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('containers.all', this.props.appId);

        return {
            loading: !handle.ready(),
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

    deleteContainer(containerId) {
        Meteor.call('container.delete', containerId, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Container deleted successfully!');
            }
        });
    }

    render() {
        return (
            <div className="ui grid full-height" style={{'marginLeft': '0'}}>
                <div className="two wide column side-sub-menu">
                    <SideSubMenu
                        heading="Containers"
                        buttonText="+ create container"
                        buttonLink={FlowRouter.path('containerCreate', {appId: this.props.appId})} />
                </div>
                <div className="fourteen wide column" style={{'paddingLeft': '0'}}>
                    <div className="content-wrapper">
                        <div className="ui grid padding35">
                            <div className="sixteen wide column">
                                <table className="ui celled table" style={{'marginTop': '15px'}}>
                                    <thead>
                                    <tr>
                                        <th>Container Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.data.containers.map((type) => {
                                        return (
                                            <tr key={type._id}>
                                                <td>
                                                    <a href={FlowRouter.path('containerUpdate', {id: type._id})}>{type.name}</a>
                                                </td>
                                                <td>
                                                    http://localhost:3000/api/items/{type.slug}?auth_key={this.data.app.authKey}
                                                </td>
                                                <td>
                                                    <a
                                                        className="mini negative ui button"
                                                        onClick={() => this.deleteContainer(type._id)}>
                                                        delete
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(ContainersList.prototype, ReactMeteorData);
