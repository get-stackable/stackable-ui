AppCloneModal = class AppCloneModal extends React.Component {
    static propTypes = {
        visible: React.PropTypes.bool.isRequired,
        toggleModal: React.PropTypes.func.isRequired,
        app: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: ''
        };
    }

    componentDidUpdate() {
        let self = this;
        $('#app-clone-modal')
            .modal({
                detachable: false,
                onHidden: function(){
                    self.toggleModal()
                }
            })
            .modal(this.props.visible ? 'show' : 'hide');
    }

    cloneApp = () => {
        if (this.state.name.length < 2) {
            FlashMessages.sendError('Please provide correct stack name');
            return;
        }

        let data = {
            name: this.state.name,
            description: this.state.description
        };

        Meteor.call('app.clone', this.props.app._id, data, (err, res) => {
            console.log(err, res);
            if (!err) {
                this.props.toggleModal();
                FlashMessages.sendSuccess('App cloned successfully!');
                FlowRouter.go('containersList', {appId: res._id});
            }
        });
    };

    render() {
        return (
            <div className="ui modal" id="app-clone-modal">
                <div className="header">
                    <img src="/images/logo.png" />
                    Clone stack
                </div>
                <div className="content">
                    <div className="ui form">
                        <div className="field">
                            <label>Stack Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Clone stack name"
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value})}/>
                        </div>
                        <div className="field">
                            <label>Stack Description</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Clone app description"
                                value={this.state.description}
                                onChange={(e) => this.setState({description: e.target.value})}/>
                        </div>
                        <button className="ui button" type="submit" onClick={this.cloneApp}>Clone</button>
                    </div>
                </div>
            </div>
        )
    }
};
