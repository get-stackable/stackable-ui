AppsModal = class AppsModal extends React.Component {
    static propTypes = {
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
            apps: Application.find({}, {sort: {createdAt: -1}}).fetch()
        };
    }

    componentDidUpdate() {
        $('#app-modal')
            .modal({
                detachable: false,
                onHidden: function(){
                    Session.set('app.modal', false);
                }
            })
            .modal(Session.get('app.modal') ? 'show' : 'hide');
    }

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
                                    goTo={this.props.goTo} />
                            )
                        })}
                        {this.data.apps.length === 0 ?
                            <AppCardEmpty />
                            :''}
                    </div>
                </div>
            </div>
        )
    }
};

reactMixin(AppsModal.prototype, ReactMeteorData);
