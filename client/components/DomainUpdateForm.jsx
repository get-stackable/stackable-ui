DomainUpdateForm = class DomainUpdateForm extends React.Component {
    static propTypes = {
        handleSubmit: React.PropTypes.func.isRequired,
        domain: React.PropTypes.object,
        users: React.PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            name: !_.isUndefined(props.domain) ?props.domain.name : '',
            userEmail: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isUndefined(nextProps.domain)) {
            this.setState({
                name: nextProps.domain.name
            });
        }
    }

    addUser = () => {
        Meteor.call('domain.addUser', this.props.domain._id, this.state.userEmail, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('User added successfully!');
            } else {
                FlashMessages.sendError(err.reason);
            }
        });
    };

    removeUser = (userId) => {
        Meteor.call('domain.removeUser', this.props.domain._id, userId, (err) => {
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
                <li key={user._id}>
                    {user.emails[0].address}
                    - <a onClick={this.removeUser.bind(this, user._id)}>remove</a>
                </li>
            )
        });
    }

    render() {
        if (_.isUndefined(this.props.domain)) {
            return <div>loading...</div>
        }

        return (
            <div>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}/>
                </div>
                <div>
                    <label>Users</label>
                    <ul>
                        {this.renderUsers()}
                    </ul>
                    <input
                        type="text"
                        placeholder="user email"
                        value={this.state.userEmail}
                        onChange={(e) => this.setState({userEmail: e.target.value})}/>
                    <a onClick={this.addUser}>add user</a>
                </div>
                <div>
                    <button onClick={this.props.handleSubmit.bind(this, this.state)}>
                        Update
                    </button>
                </div>
            </div>
        )
    }
}
