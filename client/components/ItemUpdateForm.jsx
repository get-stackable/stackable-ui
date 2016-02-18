ItemUpdateForm = class ItemUpdateForm extends React.Component {
    static defaultProps = {
        item: {}
    };

    static propTypes = {
        item: React.PropTypes.object.isRequired,
        container: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.initState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.initState(nextProps);
    }

    initState(props) {
        let stateData = {};
        if (!_.isUndefined(props.container)) {
            props.container.items.map((schema) => {
                stateData[schema.name] = props.item.data[schema.name];
            });
            this.setState(stateData);
        }
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

    handleSubmit = () => {
        Meteor.call('item.update', this.props.item._id, this.state, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Item updated successfully!');
                FlowRouter.go('appManage', {id: this.props.item.appId});
            }
        });
    };

    render() {
        return (
            <div>
                {this.loadFields()}
                <div>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
};
