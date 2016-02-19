AppCard = class AppCard extends React.Component {
    static defaultProps = {
        goTo: 'app'
    };

    static propTypes = {
        app: React.PropTypes.object.isRequired,
        goTo: React.PropTypes.string,
        closeModal: React.PropTypes.func
    };

    deleteApp = () => {
        Meteor.call('app.delete', this.props.app._id, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('App deleted successfully!');
            }
        });
    };

    generateAppKey = () => {
        Meteor.call('app.generateKey', this.props.app._id, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('App key re-generated successfully!');
            }
        });
    };

    goTo = (appId) => {
        if (!_.isUndefined(this.props.closeModal)) {
            this.props.closeModal();
        }

        if (this.props.goTo == 'containers') {
            FlowRouter.go('containersList', {appId: appId});
        } else if (this.props.goTo == 'items') {
            FlowRouter.go('itemsList', {appId: appId});
        } else {
            FlowRouter.go('appManage', {id: appId});
        }
    };

    render() {
        return (
            <div className="app card">
                <div className="ui grid">
                    <div className="three wide column">
                        <div className="ui list">
                            <div className="item">
                                <img src="/images/logo.png" style={{'width': '30px', 'height': 'auto'}} />
                            </div>
                            <div className="item">
                                <img src="/images/grey-item.png" />
                            </div>
                            <div className="item">
                                <img src="/images/grey-container.png" />
                            </div>
                        </div>
                    </div>
                    <div className="thirteen wide column">
                        <div className="content">
                            <a className="header" onClick={this.goTo.bind(this, this.props.app._id)}>
                                {this.props.app.name}
                            </a>
                            <div className="meta">
                                Key: {this.props.app.authKey}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderOld() {
        return (
            <div className="card">
                <div className="content">
                    <div className="header">
                        {this.props.app.name}
                    </div>
                    <div className="meta">
                        Key: {this.props.app.authKey}
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div
                            className="ui basic green button"
                            onClick={this.generateAppKey}>regenerate key</div>
                        <div
                            className="ui basic red button"
                            onClick={this.deleteApp}>Delete</div>
                    </div>
                </div>
            </div>
        )
    }
};
