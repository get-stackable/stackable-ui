ContentTypeUpdateForm = class ContentTypeUpdateForm extends React.Component {
    static propTypes = {
        handleSubmit: React.PropTypes.func.isRequired,
        contentType: React.PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            items: [{
                title: '',
                type: 'text'
            }]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isUndefined(nextProps.contentType)) {
            this.setState({
                name: nextProps.contentType.name,
                items: nextProps.contentType.items
            });
        }
    }

    onFieldChange = (inputName, index, field, e) => {
        field[inputName] = !_.isUndefined(e.target) ? e.target.value : e;

        let {items} = this.state;
        items[index] = field;
        this.setState({items});
    };

    renderItems() {
        if (_.isUndefined(this.state.items)) {
            return;
        }
        return this.state.items.map((field, index) => {
            return (
                <div key={index}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={field.title}
                        onChange={this.onFieldChange.bind(this, 'title', index, field)}/>
                    <label>Type</label>
                    <input
                        type="text"
                        value={field.type}
                        onChange={this.onFieldChange.bind(this, 'type', index, field)} />
                </div>
            )
        });
    }

    addField = () => {
        let {items} = this.state;

        items.push({
            title: '',
            type: 'text'
        });

        this.setState({items});
    };

    render() {
        return (
            <div>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}/>
                </div>
                <div>
                    <h4>Items</h4>
                    {this.renderItems()}
                    <button onClick={this.addField}>add field</button>
                </div>
                <div>
                    <button onClick={this.props.handleSubmit.bind(this, this.state)}>
                        Update
                    </button>
                </div>
            </div>
        )
    }
}
