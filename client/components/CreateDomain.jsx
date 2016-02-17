CreateDomain = class CreateDomain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };
    }

    handleSubmit = () => {
        Meteor.call('domain.create', this.state, (err) => {
            if (!err) {
                this.setState({
                    url: ''
                });
            }
        });
    };

    render() {
        return (
            <div>
                <label>Domain URL:</label>
                <input
                    type="text"
                    value={this.state.url}
                    onChange={(e) => this.setState({url: e.target.value})}/>
                <button onClick={this.handleSubmit}>Create</button>
            </div>
        )
    }
};
