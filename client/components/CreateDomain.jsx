CreateDomain = class CreateDomain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          name: ''
        };
    }

    handleSubmit = () => {
      Meteor.call('domain.create', this.state);
    };

    render() {
        return (
            <div>
                <label>Domain name</label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.setState({name: e.target.value})} />
                <button onClick={this.handleSubmit}>Create</button>
            </div>
        )
    }
};
