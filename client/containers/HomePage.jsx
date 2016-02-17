HomePage = class HomePage extends React.Component {
    getMeteorData() {
        return {
            domains: Domain.find().fetch(),
            user: Meteor.user()
        };
    }

    render() {
        if (_.isNull(this.data.user)) {
            return <div></div>
        }

        return (
            <div>
                <h2>Domains</h2>
                <ul>
                    {this.data.domains.map((domain) => {
                        return (
                            <li key={domain._id}>
                                <a href={FlowRouter.path('domainManage', {id: domain._id})}>{domain.name}</a> -
                                Key: {domain.authKey}
                            </li>
                        )
                    })}
                </ul>
                <CreateDomain />
            </div>
        )
    }
};

reactMixin(HomePage.prototype, ReactMeteorData);
