EntryUpdateForm = class EntryUpdateForm extends React.Component {
    static defaultProps = {
        entry: {}
    };

    static propTypes = {
        entry: React.PropTypes.object.isRequired,
        contentType: React.PropTypes.object.isRequired
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
        if (!_.isUndefined(props.contentType)) {
            props.contentType.items.map((schema) => {
                stateData[schema.name] = props.entry.data[schema.name];
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
        if (_.isUndefined(this.props.contentType.items)) {
            return;
        }

        return this.props.contentType.items.map((schema, index) => {
            return (
                <div key={index}>
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
                </div>
            )
        });
    }

    handleSubmit = () => {
        Meteor.call('entry.update', this.props.entry._id, this.state, (err, res) => {
            //console.log(err, res);
            if (!err) {
                FlashMessages.sendSuccess('Entry updated successfully!');
                FlowRouter.go('domainManage', {id: this.props.entry.domainId});
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
