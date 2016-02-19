ContainerCreate = class ContainerCreate extends React.Component {
    handleSubmit = (data) => {
        if (data.name.length === 0) {
            return;
        }

        Meteor.call('container.create', _.extend(data, {appId: this.props.appId}), (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Container created successfully!');
                FlowRouter.go('appManage', {id: this.props.appId});
            } else {
                FlashMessages.sendError(err.reason);
            }
        });
    };

    render() {
        return (
            <ContainerUpdateForm
                handleSubmit={this.handleSubmit}/>
        )
    }
};
