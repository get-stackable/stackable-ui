EntryUpdate = class EntryUpdate extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('entry.single', this.props.id);

        return {
            loading: ! handle.ready(),
            entry: Entry.findOne(this.props.id)
        };
    }

    render() {
        return (
            <EntryUpdateForm
              entry={this.data.entry} />
        )
    }
};

reactMixin(EntryUpdate.prototype, ReactMeteorData);
