HomePage = class HomePage extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('contentType.all');
        let handle2 = Meteor.subscribe('entries.all');

        return {
            loading: ! handle.ready(),
            contentTypes: ContentType.find().fetch(),
            entries: Entry.find().fetch()
        };
    }

    render() {
        return (
            <div>
                <h2>Content Types</h2>
                <ul>
                  {this.data.contentTypes.map((type, index) => {
                    return (
                      <li key={index}>{type.name}</li>
                    )
                  })}
                </ul>
                <a href={FlowRouter.path('contentTypeCreate')}>Create content type</a>
                <hr />

                <h2>Entries</h2>
                <ul>
                  {this.data.entries.map((entry, index) => {
                    let dataKeys = _.keys(entry.data);
                    return (
                      <li key={index}>
                        <a href={FlowRouter.path('entryUpdate', {type: entry.contentType, id: entry._id})}>{entry.data[dataKeys[0]]}</a>
                      </li>
                    )
                  })}
                </ul>
                {this.data.contentTypes.map((type, index) => {
                  return (
                    <a
                      href={FlowRouter.path('entryCreate', {type: type.slug})}
                      key={index}>Create {type.name}</a>
                  )
                })}
            </div>
        )
    }
};

reactMixin(HomePage.prototype, ReactMeteorData);
