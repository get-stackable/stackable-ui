Sidebar = class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            goTo: 'app'
        };
    }

    getMeteorData() {
        return {
            activeApp: Session.get('active.app')
        };
    }

    showContainers = () => {
        if (!_.isUndefined(this.data.activeApp.id)) {
            FlowRouter.go('containersList', {appId: this.data.activeApp.id});
        } else {
            this.setState({
                showModal: true,
                goTo: 'containers'
            });
        }
    };

    showItems = () => {
        if (!_.isUndefined(this.data.activeApp.id)) {
            FlowRouter.go('itemsList', {appId: this.data.activeApp.id});
        } else {
            this.setState({
                showModal: true,
                goTo: 'items'
            });
        }
    };

    hideModalBox = () => {
        this.setState({
            showModal: false
        });
    };

    renderModal() {
        return (
            <AppsModal
                showModal={this.state.showModal}
                hideModal={this.hideModalBox}
                goTo={this.state.goTo} />
        )
    }

    render() {
        return (
            <div className="ui left vertical labeled icon menu">
                <a className="item" href={FlowRouter.path('home')}>
                    <img src="/images/icon-dashboard.png" className="icon" style={{'width': '30px', 'height': '30px'}} />
                    Dashboard
                </a>
                <a className="item" onClick={this.showContainers}>
                    <img src="/images/icon-container.png" className="icon" style={{'width': '30px', 'height': '30px'}} />
                    Containers
                </a>
                <a className="item" onClick={this.showItems}>
                    <img src="/images/icon-items.png" className="icon" style={{'width': '30px', 'height': '32px'}} />
                    Items
                </a>
                <a className="item">
                    <img src="/images/icon-settings.png" className="icon" style={{'width': '30px', 'height': '32px'}} />
                    Settings
                </a>
                {this.renderModal()}
            </div>
        )
    }
};

reactMixin(Sidebar.prototype, ReactMeteorData);
