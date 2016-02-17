HomePage = class HomePage extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('domains.all');

        return {
            loading: ! handle.ready(),
            domains: Domain.find().fetch()
        };
    }

    render() {
        return (
            <div>
                <h2>Domains</h2>
                <ul>
                  {this.data.domains.map((domain) => {
                    return (
                      <li key={domain._id}>
                        <a href={FlowRouter.path('domainManage', {id: domain._id})}>{domain.name}</a>
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
