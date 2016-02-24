ItemCreate = class ItemCreate extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('containers.single', this.props.containerId);

        return {
            loading: !handle.ready(),
            container: Container.findOne({_id: this.props.containerId})
        };
    }

    handleSubmit = (data) => {
        let formData = {
            containerId: this.data.container._id,
            appId:  this.data.container.appId,
            data: data
        };

        Meteor.call('item.create', formData, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Item created successfully!');
                FlowRouter.go('itemUpdate', {id: res._id});
            } else {
                FlashMessages.sendError(err.reason);
            }
        });
    };

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return (
            <ItemUpdateForm
                container={this.data.container}
                handleSubmit={this.handleSubmit} />
        )
    }
};

reactMixin(ItemCreate.prototype, ReactMeteorData);
