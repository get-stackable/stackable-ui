ContainerCreate = class ContainerCreate extends React.Component {
    handleSubmit = (data) => {
        if (data.name.length === 0) {
            FlashMessages.sendError('Please type container name.');
            return;
        }

        let formData = {
            appId: this.props.appId,
            name: data.name,
            items: data.items,
            isSingleItem: data.isSingleItem
        };

        Meteor.call('container.create', formData, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Container created successfully!');
                FlowRouter.go('containerUpdate', {id: res._id});
            } else {
                FlashMessages.sendError(err.reason);
            }
        });
    };

    render() {
        return (<ContainerUpdateForm appId={this.props.appId} handleSubmit={this.handleSubmit}/>)
    }
};
