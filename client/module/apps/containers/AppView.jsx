AppView = class AppView extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('containers.all', this.props.id);

        return {
            loading: !handle.ready(),
            app: Application.findOne(this.props.id),
            containers: Container.find({appId: this.props.id}, {sort: {createdAt: -1}}).fetch()
        };
    }

    componentDidMount() {
        this.setActiveApp();
    }

    componentDidUpdate() {
        this.setActiveApp();
    }

    setActiveApp() {
        Session.set('active.app', {
            id: this.data.app._id,
            name: this.data.app.name
        });
    }

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return <AppSteps app={this.data.app} />
    }
};

reactMixin(AppView.prototype, ReactMeteorData);
