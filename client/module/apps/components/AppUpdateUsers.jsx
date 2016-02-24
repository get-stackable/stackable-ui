AppUpdateUsers = class AppUpdateUsers extends React.Component {
    static propTypes = {
        app: React.PropTypes.object.isRequired,
        users: React.PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            userEmail: ''
        };
    }

    addUser = () => {
        if (this.state.userEmail.length < 5) {
            //todo put email verification
            FlashMessages.sendError('Please provide correct email of user');
            return;
        }

        Meteor.call('app.addUser', this.props.app._id, this.state.userEmail, (err) => {
            if (!err) {
                this.setState({
                    userEmail: ''
                });
                FlashMessages.sendSuccess('User added successfully!');
            } else {
                FlashMessages.sendError(err.reason);
            }
        });
    };

    removeUser = (userId) => {
        Meteor.call('app.removeUser', this.props.app._id, userId, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('User removed successfully!');
            }
        });
    };

    renderUsers() {
        if (_.isUndefined(this.props.users)) {
            return;
        }
        return this.props.users.map((user) => {
            return (
                <tr key={user._id}>
                    <td>
                        {user.emails[0].address}
                    </td>
                    <td>
                        {user._id !== this.props.app.createdBy ?
                        <a
                            onClick={this.removeUser.bind(this, user._id)}
                            className="mini negative ui button">
                            remove
                        </a>:''}
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderUsers()}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="3">
                            <div className="ui right floated menu">
                                <div className="ui form item">
                                    <div className="field">
                                        <input
                                            type="text"
                                            placeholder="User email"
                                            value={this.state.userEmail}
                                            onChange={(e) => this.setState({userEmail: e.target.value})}/>
                                    </div>
                                </div>
                                <div className="item">
                                    <button className="ui button" onClick={this.addUser}>add user</button>
                                </div>
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        )
    }
}
