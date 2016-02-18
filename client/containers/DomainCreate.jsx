DomainCreate = class DomainCreate extends React.Component {
    handleSubmit = (data) => {
        if (data.name.length === 0) {
            return;
        }

        Meteor.call('domain.create', data, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Domain created successfully!');
                FlowRouter.go('domainManage', {id: res._id});
            }
        });
    };

    render() {
        return (
            <DomainUpdateForm
                handleSubmit={this.handleSubmit}/>
        )
    }
};
