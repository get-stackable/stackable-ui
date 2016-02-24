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
        return this.props.container.items.map((schema) => {
            return (
                <div className="field" key={schema._id}>
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
            <div className="ui grid full-height" style={{'marginLeft': '0'}}>
                <div className="two wide column side-sub-menu">
                    <div className="ui left vertical menu">
                        <h3 className="ui header item">
                            Items
                        </h3>
                        <a className="ui orange button item">
                            Item Tools
                        </a>

                        <div className="item" style={{'textAlign': 'center'}}>
                            <small>With great power comes great responsibility</small>
                        </div>
                    </div>
                </div>
                <div className="fourteen wide column" style={{'paddingLeft': '0'}}>
                    <div className="content-wrapper" style={{'padding': '25px 35px !important'}}>

                        <div className="ui grid">
                            <div className="ten wide column">
                                <div className="ui large header" style={{'color': '#8b8e90', 'fontWight': '400'}}>
                                    <span style={{'color':'#46a290', 'textDecoration':'underline'}}>Item</span> Is Stored inside your <span style={{'color':'#f15952', 'textDecoration':'underline'}}>{this.props.container.name}</span> container
                                </div>
                            </div>
                            <div className="six wide right aligned column">
                                <button
                                    className="ui positive button"
                                    onClick={() => this.props.handleSubmit(this.state)}>
                                    Save Item
                                </button>
                                {!_.isUndefined(this.props.item) ?
                                    <ConfirmModal
                                        buttonText="Delete Item"
                                        buttonClass="ui negative button"
                                        modalTitle="Do you want to delete this item?"
                                        modalDescription={`All data for this item will be deleted!`}
                                        accepted={() => console.log('delete item')}/>:''}
                            </div>
                        </div>
                        <div className="ui divider"></div>
                        <div className="ui form">
                            {this.loadFields()}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
};
