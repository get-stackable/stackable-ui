ContentTypeUpdate = class ContentTypeUpdate extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('contentType.single', this.props.id);

        return {
            loading: !handle.ready(),
            contentType: ContentType.findOne(this.props.id)
        };
    }

    handleSubmit = (data) => {
        Meteor.call('contentType.update', this.props.id, data, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Content type updated successfully!');
                FlowRouter.go('domainManage', {id: this.data.contentType.domainId});
            }
        });
    };

    render() {
        return (
            <ContentTypeUpdateForm
                contentType={this.data.contentType}
                handleSubmit={this.handleSubmit}/>
        )
    }
};

reactMixin(ContentTypeUpdate.prototype, ReactMeteorData);
