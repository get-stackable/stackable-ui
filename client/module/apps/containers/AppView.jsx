AppView = class AppView extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('containers.all', this.props.id);

        let data = {
            loading: true
        };

        if (handle.ready()) {
            let containers = Container.find({appId: this.props.id}, {sort: {createdAt: -1}}).fetch();

            if (containers.length !== 0) {
                FlowRouter.go('containersList', {appId: this.props.id});
                return;
            }

            data['app'] = Application.findOne(this.props.id);
            data['containers'] = containers;
            data['loading'] = false;
        }

        return data;
    }

    componentDidMount() {
        this.setActiveApp();
    }

    componentDidUpdate() {
        this.setActiveApp();
    }

    setActiveApp() {
        if (!_.isUndefined(this.data.app)) {
            Session.set('active.app', {
                id: this.data.app._id,
                name: this.data.app.name
            });
        }
    }

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return <AppSteps app={this.data.app} />
    }
};

reactMixin(AppView.prototype, ReactMeteorData);
