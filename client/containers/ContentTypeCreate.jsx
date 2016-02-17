ContentTypeCreate = class ContentTypeCreate extends React.Component {
    handleSubmit = (data) => {
        Meteor.call('contentType.create', _.extend(data, {domainId: this.props.domainId}), (err, res) => {
            console.log(err, res);
        });
    };

    render() {
        return (
            <ContentTypeUpdateForm
              handleSubmit={this.handleSubmit} />
        )
    }
};
