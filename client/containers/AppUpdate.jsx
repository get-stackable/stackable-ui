AppUpdate = class AppUpdate extends React.Component {
    getMeteorData() {
        let app = Application.findOne(this.props.id);
        let data = {app};

        if (!_.isUndefined(app)) {
            let handle = Meteor.subscribe('users.all', app.users);
            if (handle.ready()) {
                data['users'] = User.find({_id: {$in: app.users}}).fetch();
            }
        }

        return data;
    }

    handleSubmit = (data) => {
        Meteor.call('app.update', this.props.id, data, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('App updated successfully!');
                FlowRouter.go('appManage', {id: this.props.id});
            }
        });
    };

    render() {
        return (
            <AppUpdateForm
                app={this.data.app}
                users={this.data.users}
                handleSubmit={this.handleSubmit}/>
        )
    }
};

reactMixin(AppUpdate.prototype, ReactMeteorData);
