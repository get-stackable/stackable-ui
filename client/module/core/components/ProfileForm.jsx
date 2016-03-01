ProfileForm = class ProfileForm extends React.Component {
    static defaultProps = {
        user: {}
    };

    static propTypes = {
        user: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        if (_.isUndefined(props.user.profile)) {
            props.user.profile = {};
        }

        if (_.isUndefined(props.user.emails)) {
            props.user.emails = [];
        }

        this.state = {
            email: props.user.emails.length !== 0 ? props.user.emails[0].address : '',
            first_name: !_.isUndefined(props.user.profile.first_name) ? props.user.profile.first_name : '',
            last_name: !_.isUndefined(props.user.profile.last_name) ? props.user.profile.last_name : '',
            location: !_.isUndefined(props.user.profile.location) ? props.user.profile.location : '',
            about: !_.isUndefined(props.user.profile.about) ? props.user.profile.about : ''
        };
    }

    handleSubmit = () => {
        let data = {
            'profile.first_name': this.state.first_name,
            'profile.last_name': this.state.last_name,
            'profile.location': this.state.location,
            'profile.about': this.state.about
        };

        Meteor.call('user.update', data, (err, res) => {
            if (!err) {
                FlashMessages.sendSuccess('Updated profile data successfully!');
            }
        });
    };

    render() {
        return (
            <div className="ui form">
                <div className="field">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={this.state.first_name}
                        onChange={(e) => this.setState({first_name: e.target.value})} />
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="First Name"
                        value={this.state.last_name}
                        onChange={(e) => this.setState({last_name: e.target.value})} />
                </div>
                <div className="field">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={this.state.location}
                        onChange={(e) => this.setState({location: e.target.value})} />
                </div>
                <div className="field">
                    <label>About You</label>
                    <textarea
                        rows="3"
                        name="about"
                        placeholder="About You"
                        value={this.state.about}
                        onChange={(e) => this.setState({about: e.target.value})}></textarea>
                </div>
                {/*<div className="ui divider"></div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})} />
                </div>*/}
                <button className="ui green button" type="submit" onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
};
