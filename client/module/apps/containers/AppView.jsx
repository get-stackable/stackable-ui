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

        if (this.data.containers.length > 0) {
            return (
                <div className="ui grid full-height" style={{'marginLeft': '0'}}>
                    <div className="sixteen wide column" style={{'paddingLeft': '0'}}>
                        <div className="content-wrapper">
                            <PageHeading>
                                {this.data.app.name}'s Containers
                            </PageHeading>
                            <div className="ui grid">
                                <div className="sixteen wide column padding35">
                                    <ContainersList containers={this.data.containers} app={this.data.app} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <AppSteps app={this.data.app} />
        }
    }
};

reactMixin(AppView.prototype, ReactMeteorData);
