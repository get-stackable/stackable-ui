AppManageKeys = class AppManageKeys extends React.Component {
    static propTypes = {
        app: React.PropTypes.object
    };

    generateAppKey = () => {
        Meteor.call('app.generateKey', this.props.app._id, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Stack key for stack re-generated successfully!');
            }
        });
    };

    render() {
        return (
            <div className="ui form">
                <div className="field">
                    <label>Stack Key</label>
                    <input type="text" value={this.props.app.authKey} readOnly />
                </div>
                <button className="ui button" type="submit" onClick={this.generateAppKey}>
                    <i className="refresh icon"></i>
                    Reset key
                </button>
            </div>
        )
    }
};
