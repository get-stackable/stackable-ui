AppDeleteModal = class AppDeleteModal extends React.Component {
    static propTypes = {
        visible: React.PropTypes.bool.isRequired,
        toggleModal: React.PropTypes.func.isRequired,
        app: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    componentDidUpdate() {
        let self = this;
        $('#app-delete-modal')
            .modal({
                detachable: false,
                onHidden: function(){
                    self.props.toggleModal()
                }
            })
            .modal(this.props.visible ? 'show' : 'hide');
    }

    deleteApp = () => {
        if (this.props.app.name !== this.state.name) {
            FlashMessages.sendError('Please type in correct stack name to start delete process.');
            return;
        }

        this.props.toggleModal();
        Meteor.call('app.delete', this.props.app._id, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Stack deleted successfully!');
                FlowRouter.go('home');
            }
        });
    };

    render() {
        return (
            <div className="ui modal" id="app-delete-modal">
                <div className="header">
                    <img src="/images/logo.png" />
                    Delete stack
                    <i className="close icon" onClick={() => this.props.toggleModal()}></i>
                </div>
                <div className="content">
                    <div className="ui segment">
                        <p>Deleting the stack will also delete its all related containers and items!</p>
                    </div>
                    <div className="ui form">
                        <div className="field">
                            <label>Confirm stack name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Confirm stack name to delete"
                                value={this.state.name}
                                onChange={(e) => this.setState({name: e.target.value})}/>
                        </div>
                        <button className="ui button" type="submit" onClick={this.deleteApp}>DELETE!</button>
                    </div>
                </div>
            </div>
        )
    }
};

