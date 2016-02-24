ItemUpdateForm = class ItemUpdateForm extends React.Component {
    static defaultProps = {
        container: {}
    };

    static propTypes = {
        handleSubmit: React.PropTypes.func.isRequired,
        container: React.PropTypes.object.isRequired,
        item: React.PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = this.initState(props);
    }

    componentDidMount() {
        //this.initState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.initState(nextProps));
    }

    initState(props) {
        let stateData = {};
        if (!_.isUndefined(props.container)) {
            if (_.isUndefined(props.item)) {
                //is create
                props.container.items.map((schema) => {
                    stateData[schema.name] = '';
                });
            } else {
                //is update
                props.container.items.map((schema) => {
                    stateData[schema.name] = props.item.data[schema.name];
                });
            }
        }

        return stateData;
    }

    onChange = (inputName, e) => {
        let change = {};
        change[inputName] = !_.isUndefined(e.target) ? e.target.value : e;
        this.setState(change);
    };

    loadFields() {
        if (_.isUndefined(this.props.container.items)) {
            return;
        }

        return this.props.container.items.map((schema) => {
            return (
                <div key={schema._id}>
                    <label>{schema.name}</label>
                    {schema.type === 'text' ?
                        <TextInput
                            value={this.state[schema.name]}
                            onChange={this.onChange.bind(this, schema.name)}/> : ''}
                    {schema.type === 'number' ?
                        <NumberInput
                            value={this.state[schema.name]}
                            onChange={this.onChange.bind(this, schema.name)}/> : ''}
                    {schema.type === 'textArea' ?
                        <MarkdownEditor
                            text={this.state[schema.name]}
                            onChange={this.onChange.bind(this, schema.name)}/> : ''}
                    {schema.type === 'boolean' ?
                        <BooleanInput
                            name={schema.name}
                            value={this.state[schema.name]}
                            onChange={this.onChange.bind(this, schema.name)}/> : ''}
                    {schema.type === 'json' ?
                        <JsonInput
                            name={schema.name}
                            value={this.state[schema.name]}
                            onChange={this.onChange.bind(this, schema.name)}/> : ''}
                    {schema.type === 'enom' ?
                        <EnomInput
                            name={schema.name}
                            value={this.state[schema.name]}
                            onChange={this.onChange.bind(this, schema.name)}/> : ''}
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                {this.loadFields()}
                <div>
                    <button onClick={() => this.props.handleSubmit(this.state)}>Submit</button>
                </div>
            </div>
        )
    }
};
