AppsModal = class AppsModal extends React.Component {
    static propTypes = {
        showModal: React.PropTypes.bool.isRequired,
        hideModal: React.PropTypes.func.isRequired,
        goTo: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    getMeteorData() {
        return {
            apps: Application.find().fetch()
        };
    }

    componentDidUpdate() {
        $('#app-modal')
            .modal({detachable: false})
            .modal(this.props.showModal ? 'show' : 'hide');
    }

    hideModal = () => {
        this.props.hideModal();
    };

    render() {
        return (
            <div className="ui modal" id="app-modal">
                <div className="header">
                    Select Stack
                </div>
                <div className="content">
                    <Loading active={this.state.isLoading} />
                    <div className="ui cards">
                        {this.data.apps.map((app) => {
                            return (
                                <AppCard
                                    key={app._id}
                                    app={app}
                                    goTo={this.props.goTo}
                                    closeModal={this.props.hideModal} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(AppsModal.prototype, ReactMeteorData);
