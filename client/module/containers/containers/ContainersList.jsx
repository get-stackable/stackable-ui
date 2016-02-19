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
            </div>
        )
    }
};

reactMixin(ContainersList.prototype, ReactMeteorData);
