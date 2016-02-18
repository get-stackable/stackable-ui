AppCreate = class AppCreate extends React.Component {
    handleSubmit = (data) => {
        if (data.name.length === 0) {
            return;
        }

        Meteor.call('app.create', data, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('App created successfully!');
                FlowRouter.go('appManage', {id: res._id});
            }
        });
    };

    render() {
        return (
            <AppUpdateForm
                handleSubmit={this.handleSubmit}/>
        )
    }
};
