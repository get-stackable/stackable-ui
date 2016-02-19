AppCard = class AppCard extends React.Component {
    static defaultProps = {
        goTo: 'app'
    };

    static propTypes = {
        app: React.PropTypes.object.isRequired,
        goTo: React.PropTypes.string
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

    goTo = (to) => {
        Session.set('app.modal', false);

        let goTo = this.props.goTo;
        if (_.isString(to)) {
            goTo = to;
        }

        if (goTo == 'containers') {
            FlowRouter.go('containersList', {appId: this.props.app._id});
        } else if (goTo == 'items') {
            FlowRouter.go('itemsList', {appId: this.props.app._id});
        } else {
            //FlowRouter.go('appManage', {id: this.props.app._id});
            FlowRouter.go('containersList', {appId: this.props.app._id});
        }
    };

    render() {
        return (
            <div className="app card">
                <div className="ui grid">
                    <div className="three wide column">
                        <div className="ui list">
                            <a className="item" onClick={this.goTo.bind(this, 'app')}>
                                <img src="/images/logo.png" style={{'width': '30px', 'height': 'auto'}} />
                            </a>
                            <a className="item" onClick={this.goTo.bind(this, 'items')}>
                                <img src="/images/grey-item.png" />
                            </a>
                            <a className="item" onClick={this.goTo.bind(this, 'containers')}>
                                <img src="/images/grey-container.png" />
                            </a>
                        </div>
                    </div>
                    <div className="thirteen wide column">
                        <div className="content">
                            <a className="header" onClick={this.goTo}>
                                {this.props.app.name}
                            </a>
                            <div className="meta">
                                Key: {this.props.app.authKey}
                                <a onClick={this.generateAppKey}>
                                    <i className="refresh icon"></i>
                                </a>
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
