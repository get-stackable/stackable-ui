HomePage = class HomePage extends React.Component {
    getMeteorData() {
        return {
            apps: Application.find().fetch(),
            user: Meteor.user()
        };
    }

    componentDidMount() {
        Session.set('active.app', '');
    }

    render() {
        if (_.isNull(this.data.user)) {
            return <Loading active={true} />
        }

        return (
            <div>
                <PageHeading>
                    Dashboard
                </PageHeading>
                <div className="ui grid padding35">
                    <div className="sixteen wide column">
                        <h3>My Apps</h3>
                        <div className="ui cards">
                            {this.data.apps.map((app) => {
                                return (
                                    <AppCard key={app._id} app={app} />
                                )
                            })}
                            <AppCardEmpty />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(HomePage.prototype, ReactMeteorData);
