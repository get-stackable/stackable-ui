ContentTypeCreate = class ContentTypeCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            fields: []
        };
    }

    handleSubmit() {
        Meteor.call('contentType.create', this.state, (err, res) => {
            console.log(err, res);
        });
    };

    render() {
        return (
            <div>
                <div>
                    <label>Name</label>
                    <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
                </div>
                <div>
                    <button onClick={this.handleSubmit.bind(this)}>Create</button>
                </div>
            </div>
        )
    }
};
