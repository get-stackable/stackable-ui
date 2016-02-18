DomainUpdate = class DomainUpdate extends React.Component {
    getMeteorData() {
        let domain = Domain.findOne(this.props.id);
        let data = {
            domain: domain
        };
        if (!_.isUndefined(domain)) {
            let handle = Meteor.subscribe('users.all', domain.users);
            if (handle.ready()) {
                data['users'] = User.find({_id: {$in: domain.users}}).fetch();
            }
        }

        return data;
    }

    handleSubmit = (data) => {
        Meteor.call('domain.update', this.props.id, data, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Domain updated successfully!');
                FlowRouter.go('domainManage', {id: this.props.id});
            }
        });
    };

    render() {
        return (
            <DomainUpdateForm
                domain={this.data.domain}
                users={this.data.users}
                handleSubmit={this.handleSubmit}/>
        )
    }
};

reactMixin(DomainUpdate.prototype, ReactMeteorData);
