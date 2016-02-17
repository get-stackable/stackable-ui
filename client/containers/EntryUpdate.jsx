EntryUpdate = class EntryUpdate extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('entry.single', this.props.id);

        let entry = Entry.findOne(this.props.id);
        let data = {
            loading: ! handle.ready()
        };

        if (handle.ready() && !_.isUndefined(entry)) {
            data['entry'] = entry;
            data['contentType'] = ContentType.findOne({_id: entry.contentTypeId});
        }

        return data;
    }

    render() {
        if (this.data.loading) {
            return <div>loading...</div>
        }

        return (
            <EntryUpdateForm
              entry={this.data.entry}
              contentType={this.data.contentType} />
        )
    }
};

reactMixin(EntryUpdate.prototype, ReactMeteorData);
