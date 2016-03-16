AppCard = class AppCard extends React.Component {
    static defaultProps = {
        goTo: 'app'
    };

    static propTypes = {
        app: React.PropTypes.object.isRequired,
        goTo: React.PropTypes.string
    };

    goTo = (to) => {
        Session.set('app.modal', false);

        let goTo = this.props.goTo;
        if (_.isString(to)) {
            goTo = to;
        }


        FlowRouter.go('containersList', {appId: this.props.app._id});
        //if (goTo == 'containers') {
        //    FlowRouter.go('containersList', {appId: this.props.app._id});
        //} else if (goTo == 'items') {
        //    FlowRouter.go('itemsList', {appId: this.props.app._id});
        //} else {
        //    FlowRouter.go('containersList', {appId: this.props.app._id});
        //}
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
                                Public Key: {this.props.app.publicKey}
                                <br />
                                <a className="tiny ui basic button" href={FlowRouter.path('appUpdate', {id: this.props.app._id})}>
                                    <i className="icon setting"></i>
                                    settings
                                </a>
                                <a className="tiny ui basic button" href={StackableApi.getContainers(this.props.app.publicKey)} target="_blank">
                                    <i className="icon share"></i>
                                    api url
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
