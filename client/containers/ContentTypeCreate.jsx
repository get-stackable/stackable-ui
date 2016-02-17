ContentTypeCreate = class ContentTypeCreate extends React.Component {
    handleSubmit = (data) => {
        if (data.name.length === 0) {
            return;
        }

        Meteor.call('contentType.create', _.extend(data, {domainId: this.props.domainId}), (err, res) => {
            console.log(err, res);
            FlowRouter.go('domainManage', {id: this.props.domainId});
        });
    };

    render() {
        return (
            <ContentTypeUpdateForm
                handleSubmit={this.handleSubmit}/>
        )
    }
};
