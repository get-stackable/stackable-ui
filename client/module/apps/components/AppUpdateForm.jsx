AppUpdateForm = class AppUpdateForm extends React.Component {
    static propTypes = {
        app: React.PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            name: !_.isUndefined(props.app) ? props.app.name : '',
            description: !_.isUndefined(props.app) ? props.app.description : ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isUndefined(nextProps.app)) {
            this.setState({
                name: nextProps.app.name,
                description: nextProps.app.description
            });
        }
    }

    handleSubmit = () => {
        let data = {
            name: this.state.name,
            description: this.state.description
        };

        Meteor.call('app.update', this.props.id, data, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('App updated successfully!');
            }
        });
    };

    render() {
        return (
            <div className="ui form">
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Description</label>
                    <input
                        type="text"
                        value={this.state.description}
                        onChange={(e) => this.setState({description: e.target.value})}/>
                </div>
                <button className="ui button" type="submit"  onClick={this.handleSubmit}>Update</button>
            </div>
        )
    }
};
