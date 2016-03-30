ItemCreate = class ItemCreate extends React.Component {
    getMeteorData() {
        let handle = Meteor.subscribe('containers.single', this.props.containerId);

        let user = User.findOne(Meteor.userId());
        let Item = user.profile.isPaid ? ItemPaid : ItemFree;

        let data = {
            loading: true
        };

        if (handle.ready()) {
            let container = Container.findOne({_id: this.props.containerId});
            data['container'] = container;
            data['app'] = Application.findOne({_id: container.appId});

            let handle2 = Meteor.subscribe('items.all', container.appId, container._id);
            let handle3 = Meteor.subscribe('containers.all', container.appId);
            if (handle2.ready() && handle3.ready()) {
                data['allItems'] = Item.find({containerId: container._id}, {sort: {createdAt: -1}}).fetch();
                data['allContainers'] = Container.find({appId: container.appId}, {sort: {createdAt: -1}}).fetch();
                data['loading'] = false;
            }
        }

        return data;
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
                FlowRouter.go('itemUpdate', {id: res.getId()});
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
                allItems={this.data.allItems}
                allContainers={this.data.allContainers}
                isContainerView={!_.isUndefined(this.props.isView)}
                app={this.data.app}
                handleSubmit={this.handleSubmit} />
        )
    }
};

reactMixin(ItemCreate.prototype, ReactMeteorData);
