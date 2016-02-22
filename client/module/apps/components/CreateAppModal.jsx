CreateAppModalTrigger = class CreateAppModalTrigger extends React.Component {
    constructor(props) {
        super(props);

        this.loadModal(props);
    }

    componentWillUpdate(nextProps) {
        this.loadModal(nextProps);
    }

    loadModal(props) {
        $('#app-create-modal')
            .modal({
                detachable: false,
                onHidden: function(){
                    Session.set('app.create.modal', ! Session.get('app.create.modal'));
                }
            })
            .modal(props.modalVisible ? 'show' : 'hide');
    }

    render() {
        return <div></div>
    }
};

CreateAppModal = class CreateAppModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            step: 1,
            library: null,
            libraryId: null,
            appName: '',
            appDescription: ''
        };
    }

    getMeteorData() {
        let handle = Meteor.subscribe('apps.libraries.all');

        return {
            loading: !handle.ready(),
            apps: ApplicationLibrary.find().fetch(),
            modalVisible: Session.get('app.create.modal')
        };
    }

    selectLibrary = (app) => {
        this.setState({
            libraryId: app._id,
            library: app
        });
    };

    goToStepTwo = () => {
        this.setState({
            step: 2
        });
    };

    renderStepOne() {
        return (
            <div>
                <div className="ui three column grid">
                    <div className="column">
                        <h3 className="ui header" style={{'fontSize': '1.78rem', 'fontWeight': '400'}}>
                            Blank Stack
                            <div className="sub header">
                                Start Fresh? <a href="#">Learn more here</a>
                            </div>
                        </h3>
                    </div>
                    <div className="column">
                        Empty stack
                    </div>
                    <div className="bottom aligned column">
                        <button className="ui secondary button pull-right" onClick={this.goToStepTwo}>
                            CREATE EMPTY STACK
                        </button>
                    </div>
                </div>
                <div className="ui divider" style={{'marginTop': '30px'}}></div>
                <h4 className="ui header" style={{'fontSize': '1.48rem'}}>
                    Stackable Library
                    <div className="sub header">
                        Sometimes you just want to get going quickly check out our templates
                    </div>
                </h4>
                <div className="ui grid">
                    <div className="thirteen wide column">
                        <div className="ui four cards">
                            {this.data.apps.map((app) => {
                                return (
                                    <div className="card" key={app._id}>
                                        <div className="content" style={{textAlign: 'center'}}>
                                            <div className="header" style={{'margin': '10px 0'}}>
                                                <img src="/images/grey-stack.png" />
                                                <br />
                                                {app.name}
                                            </div>
                                            <div className="meta">
                                                <button
                                                    className="mini ui basic button"
                                                    onClick={this.selectLibrary.bind(this, app)}>
                                                    choose
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="bottom aligned three wide column" style={{'textAlign': 'right'}}>
                        {!_.isNull(this.state.library) ?
                            <div className="ui list">
                                <div className="item" style={{'marginBottom': '20px'}}>
                                    <i className="arrow right icon"></i>
                                    <div className="content">
                                        <strong>{this.state.library.name}</strong>
                                    </div>
                                </div>
                                <div className="item" style={{'marginBottom': '20px'}}>
                                    <i className="cube icon"></i>
                                    <div className="content">
                                        {this.state.library.description}
                                    </div>
                                </div>
                            </div>
                            : ''}
                        <button
                            className="fluid ui secondary button"
                            onClick={this.goToStepTwo}>
                            USE STACK
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    renderStepTwo() {
        return (
            <div className="ui form">
                <div className="field">
                    <label>Stack Name</label>
                    <input
                        type="text"
                        name="app-name"
                        placeholder="Stack Name"
                        value={this.state.appName}
                        onChange={(e) => this.setState({appName: e.target.value})} />
                </div>
                <div className="field">
                    <label>Stack Description</label>
                    <input
                        type="text"
                        name="app-description"
                        placeholder="Stack Description"
                        value={this.state.appDescription}
                        onChange={(e) => this.setState({appDescription: e.target.value})} />
                </div>
                <button className="ui button" type="submit" onClick={this.handleSubmit}>
                    Create!
                </button>
            </div>
        )
    }

    handleSubmit = () => {
        if (this.state.appName.length === 0) {
            return;
        }

        let data = {
            name: this.state.appName,
            description: this.state.appDescription,
            libraryId: this.state.libraryId
        };

        Meteor.call('app.create', data, (err, res) => {
            //console.log(err, res);
            if (!err) {
                Session.set('app.create.modal', false);
                FlashMessages.sendSuccess('Stack created successfully!');
                FlowRouter.go('containersList', {appId: res._id});
            }
        });
    };

    render() {
        return (
            <div className="ui modal" id="app-create-modal">
                <div className="header">
                    <img src="/images/logo.png" />
                    Create new stack
                    <i className="close icon" onClick={() => Session.set('app.create.modal', false)}></i>
                </div>
                <div className="content">
                    <Loading active={this.state.isLoading} />
                    {this.state.step === 1 ? this.renderStepOne() : ''}
                    {this.state.step === 2 ? this.renderStepTwo() : ''}
                </div>
                <CreateAppModalTrigger modalVisible={this.data.modalVisible} />
            </div>
        )
    }
};

reactMixin(CreateAppModal.prototype, ReactMeteorData);
