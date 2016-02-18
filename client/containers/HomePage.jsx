HomePage = class HomePage extends React.Component {
    getMeteorData() {
        return {
            domains: Domain.find().fetch(),
            user: Meteor.user()
        };
    }

    deleteDomain(domainId) {
        Meteor.call('domain.delete', domainId, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Domain deleted successfully!');
            }
        });
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
                                <a href={FlowRouter.path('domainManage', {id: domain._id})}>{domain.name}</a>
                                - Key: {domain.authKey}
                                - <a href={FlowRouter.path('domainUpdate', {id: domain._id})}>edit</a>
                                - <a onClick={() => this.deleteDomain(domain._id)}>delete</a>
                            </li>
                        )
                    })}
                </ul>
                <a href={FlowRouter.path('domainCreate')}>create domain</a>
            </div>
        )
    }
};

reactMixin(HomePage.prototype, ReactMeteorData);
