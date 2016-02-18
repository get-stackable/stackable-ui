var fieldTypes = [{
    title: 'Text Field',
    value: 'text'
}, {
    title: 'Text Editor',
    value: 'textArea'
}, {
    title: 'Number',
    value: 'number'
}, {
    title: 'Boolean',
    value: 'boolean'
}, {
    title: 'Json',
    value: 'json'
}, {
    title: 'Enom (Select)',
    value: 'enom'
}];

ContainerUpdateForm = class ContainerUpdateForm extends React.Component {
    static propTypes = {
        handleSubmit: React.PropTypes.func.isRequired,
        container: React.PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            items: [{
                name: 'Title',
                type: 'text',
                validations: ''
            }]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isUndefined(nextProps.container)) {
            this.setState({
                name: nextProps.container.name,
                items: nextProps.container.items,
                validations: nextProps.container.validations
            });
        }
    }

    onFieldChange = (inputName, index, field, e) => {
        field[inputName] = !_.isUndefined(e.target) ? e.target.value : e;

        let {items} = this.state;
        items[index] = field;
        this.setState({items});
    };

    renderValidations(field, index) {
        return (
            <div>
                <label>Validations</label>
                    <textarea
                        rows="4"
                        value={field.validations}
                        onChange={this.onFieldChange.bind(this, 'validations', index, field)}></textarea>
            </div>
        )
    }

    renderItems() {
        if (_.isUndefined(this.state.items)) {
            return;
        }
        return this.state.items.map((field, index) => {
            return (
                <div key={index}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={field.name}
                        onChange={this.onFieldChange.bind(this, 'name', index, field)}/>
                    <label>Type</label>
                    <select
                        onChange={this.onFieldChange.bind(this, 'type', index, field)}
                        defaultValue={field.type}>
                        {fieldTypes.map((item) => {
                            return <option
                                key={item.value}
                                value={item.value}>{item.title}</option>
                        })}
                    </select>
                    <br />
                    {this.renderValidations(field, index)}
                    <hr />
                </div>
            )
        });
    }

    addField = () => {
        let {items} = this.state;

        items.push({
            name: '',
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
