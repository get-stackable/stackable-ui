DomainManage = class DomainManage extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('contentType.all', this.props.id);
        let handle2 = Meteor.subscribe('entries.all', this.props.id);

        return {
            loading: !handle.ready(),
            contentTypes: ContentType.find().fetch(),
            entries: Entry.find().fetch(),
            domain: Domain.findOne(this.props.id)
        };
    }

    deleteContentType(typeId) {
        Meteor.call('contentType.delete', typeId, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Content type deleted successfully!');
            }
        });
    }

    deleteEntry(entryId) {
        Meteor.call('entry.delete', entryId, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Entry deleted successfully!');
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Content Types</h2>
                <ul>
                    {this.data.contentTypes.map((type, index) => {
                        return (
                            <li key={index}>
                                <a href={FlowRouter.path('contentTypeUpdate', {id: type._id})}>{type.name}</a>
                                - http://localhost:3000/api/entries/{type.slug}?auth_key={this.data.domain.authKey}
                                - <a onClick={() => this.deleteContentType(type._id)}>delete</a>
                            </li>
                        )
                    })}
                </ul>
                <a href={FlowRouter.path('contentTypeCreate', {domainId: this.props.id})}>Create content type</a>
                <hr />

                <h2>Entries</h2>
                <ul>
                    {this.data.entries.map((entry, index) => {
                        let dataKeys = _.keys(entry.data);
                        return (
                            <li key={index}>
                                <a href={FlowRouter.path('entryUpdate', {type: entry.contentType, id: entry._id})}>{entry.data[dataKeys[0]]}</a>
                                - http://localhost:3000/api/entries/{entry.contentType}/{entry._id}?auth_key={this.data.domain.authKey}
                                - <a onClick={() => this.deleteEntry(entry._id)}>delete</a>
                            </li>
                        )
                    })}
                </ul>
                {this.data.contentTypes.map((type, index) => {
                    return (
                        <a
                            href={FlowRouter.path('entryCreate', {type: type.slug, domainId: this.props.id})}
                            key={index}>Create {type.name} - </a>
                    )
                })}
            </div>
        )
    }
};

reactMixin(DomainManage.prototype, ReactMeteorData);
