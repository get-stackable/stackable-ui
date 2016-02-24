ConfirmModal = class ConfirmModal extends React.Component {
    static defaultProps = {
        buttonClass: 'ui button'
    };

    static propTypes = {
        accepted: React.PropTypes.func.isRequired,
        buttonText: React.PropTypes.string.isRequired,
        buttonClass: React.PropTypes.string,
        modalTitle: React.PropTypes.string.isRequired,
        modalDescription: React.PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    handleAccept = () => {
        this.setState({active: false});
        this.props.accepted();
    };

    renderModal() {
        let self = this;
        $('.ui.confirm.modal')
            .modal({
                detachable: false
            })
            .modal(self.state.active ? 'show' : 'hide');

        return (
            <div className="ui confirm small modal">
                <i className="close icon"></i>
                <div className="header">
                    {this.props.modalTitle}
                </div>
                <div className="content" style={{'textAlign': 'center'}}>
                    <div className="description">
                        <p>
                            {this.props.modalDescription}
                        </p>
                    </div>
                </div>
                <div className="actions">
                    <div className="two fluid ui buttons">
                        <a className="ui red basic button" onClick={() => this.setState({active: false})}>
                            <i className="remove icon"></i>
                            No
                        </a>
                        <a className="ui green basic button" onClick={this.handleAccept}>
                            <i className="checkmark icon"></i>
                            Yes
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <span>
                <a
                    className={this.props.buttonClass}
                    onClick={() => this.setState({active: true})}>
                    {this.props.buttonText}
                </a>
                {this.renderModal()}
            </span>
        )
    }
};
