ItemUpdateForm = class ItemUpdateForm extends React.Component {
    static defaultProps = {
        container: {},
        isContainerView: false
    };

    static propTypes = {
        handleSubmit: React.PropTypes.func.isRequired,
        container: React.PropTypes.object.isRequired,
        item: React.PropTypes.object,
        allItems: React.PropTypes.array.isRequired,
        allContainers: React.PropTypes.array.isRequired,
        isContainerView: React.PropTypes.bool,
        app: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = this.initState(props);
    }

    componentDidMount() {
        //init validations
        this.initValidations(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.initState(nextProps));
    }

    componentDidUpdate() {
        //init validations
        this.initValidations(this.props);
    }

    initValidations(props) {
        if (props.isContainerView) {
            return false;
        }

        let fields = {};
        props.container.items.map((item) => {
            let rules = [];
            if (item.isRequired) {
                rules.push({
                    type   : 'empty',
                    prompt : `Please enter ${item.name}`
                });
            }
            if (!_.isUndefined(item.validations.min)) {
                let min = parseInt(item.validations.min);
                if (min > 0) {
                    rules.push({
                        type   : `minLength[${min}]`,
                        prompt : `Please enter at least ${min} characters ${item.name}`
                    });
                }
            }
            if (!_.isUndefined(item.validations.max)) {
                let max = parseInt(item.validations.max);
                if (max > 0) {
                    rules.push({
                        type   : `maxLength[${max}]`,
                        prompt : `Please enter at most ${max} characters ${item.name}`
                    });
                }
            }
            if (item.type === 'text' && !_.isUndefined(item.validations.type)) {
                if (item.validations.type === 'email') {
                    rules.push({
                        type   : 'email',
                        prompt : `Please enter a valid e-mail in ${item.name}`
                    });
                } else if (item.validations.type === 'url') {
                    rules.push({
                        type   : 'url',
                        prompt : `Please enter a valid url in ${item.name}`
                    });
                }
            }

            fields[item.slug] = {
                identifier: item.slug,
                rules: rules
            };
        });

        $('.ui.form.item').form({
            fields: fields
        });
    }

    initState(props) {
        if (this.props.isContainerView) {
            return {};
        }

        let stateData = {};
        let containerItems = _.sortBy(props.container.items, 'listing_order');

        if (!_.isUndefined(props.container)) {
            if (_.isUndefined(props.item)) {
                //is create
                containerItems.map((schema) => {
                    stateData[schema.slug] = '';
                });
            } else {
                //is update
                containerItems.map((schema) => {
                    stateData[schema.slug] = props.item.data[schema.slug];
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

    onFileUpload (err, res, inputName) {
        if (!err) {
            let change = {};
            change[inputName] = res;
            this.setState(change);
        }
    }

    deleteItem() {
        alertify.confirm('Do you want to delete this item?', 'Deleting this item will delete it permanently!',
            () => {
                Meteor.call('item.delete', this.props.item._id, (err) => {
                    if (!err) {
                        FlashMessages.sendSuccess('Item deleted successfully!');
                        FlowRouter.go('itemContainerView', {containerId: this.props.container._id});
                    }
                });
            },
            () => {
                //cancel
            });
    }

    doSubmit = () => {
        let form = $('.ui.form.item');
        form.form('submit');
        if (form.form('is valid')) {
            this.props.handleSubmit(this.state);
        }
    };

    loadFields() {
        let containerItems = _.sortBy(this.props.container.items, 'listing_order');

        return containerItems.map((schema) => {
            //console.log(schema);

            //if field is disabled
            if (schema.isDisabled) {
                return;
            }

            let field = null;
            if (schema.type === 'text') {
                field = <TextInput
                    name={schema.slug}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}/>;
            } else if (schema.type === 'number') {
                field = <NumberInput
                    name={schema.slug}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}/>;
            } else if (schema.type === 'textArea') {
                //todo do validation
                field = <MarkdownEditor
                    text={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}
                    className="mardown-editor-container"
                    options={{toolbar: {diffTop: -55}}}
                    isRequired={schema.isRequired}
                    validations={schema.validations}/>;
            } else if (schema.type === 'boolean') {
                field = <BooleanInput
                    name={schema.name}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}/>;
            } else if (schema.type === 'json') {
                field = <JsonInput
                    name={schema.slug}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}/>;
            } else if (schema.type === 'enom') {
                //todo do isRequired
                field = <EnomInput
                    name={schema.slug}
                    value={this.state[schema.slug]}
                    onChange={this.onChange.bind(this, schema.slug)}
                    options={!_.isUndefined(schema.validations.options) ? schema.validations.options : ''}/>;
            } else if (schema.type === 'image') {
                //todo do validation
                field = <FileInput
                    file={!_.isUndefined(this.state[schema.slug]) ? this.state[schema.slug].url : null}
                    onUpload={(err, res) => this.onFileUpload(err, res, schema.slug)}
                    isRequired={schema.isRequired}
                    validations={schema.validations}/>;
            } else if (schema.type === 'relation') {
                //todo do isRequired
                field = <RelationInput
                    relations={schema.relations}
                    value={this.state[schema.slug]}
                    onChange={(data) => this.onChange(schema.slug, data)}
                    isRequired={schema.isRequired} />;
            }

            return (
                <div className="field" key={schema._id}>
                    <label style={{'color':'#34383c','fontWeight':'400'}}>
                        {titleize(schema.name)}
                        {schema.isRequired ? <span className="red">*</span> : '' }
                    </label>
                    {field}
                    <p className="field-description">{schema.description}</p>
                </div>
            )
        });
    }

    renderAllContainers() {
        return this.props.allContainers.map((container) => {
            let isActive = container._id === this.props.container._id;
            return (
                <a
                    className={classNames('item', {'active': isActive})}
                    key={container._id}
                    onClick={() => FlowRouter.go('itemContainerView', {containerId: container._id})}>
                    <i className="circle icon"></i>
                    <div className="content">
                        {titleize(pluralize(container.name))}
                    </div>
                </a>
            )
        });
    }

    renderAllItems() {
        if (this.props.allItems.length === 0) {
            return (
                <div className="item">
                    <div className="content">
                        No items found.
                    </div>
                </div>
            )
        }

        return this.props.allItems.map((item) => {
            let isActive = !_.isUndefined(this.props.item) && item._id === this.props.item._id;
            return (
                <div className={classNames('item', {'active': isActive})} key={item._id}>
                    <div className="right floated content">
                        {/*<div className="ui button">Add</div>*/}
                    </div>
                    <div className="content">
                        <a className="header" onClick={() => FlowRouter.go('itemUpdate', {id: item.getId()})}>
                            {item.getFirstField()}
                        </a>
                        <div className="description">created {item.relDate()}</div>
                    </div>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="ui grid full-height item-edit" style={{'marginLeft': '0'}}>
                <div className="two wide column containers-list">
                    <button className="fluid ui green button" style={{'lineHeight': '26px', 'padding': '0.4em 0.2em', 'textAlign': 'left'}}>
                        <img src="/images/stack-icon.png" style={{'width': '25px', 'height': 'auto', 'float': 'left'}} />
                        {titleize(this.props.app.name)}
                    </button>
                    <div className="ui link list" style={{'marginTop': '30px'}}>
                        {this.renderAllContainers()}
                    </div>
                </div>
                <div className="three wide column items-list">
                    <a
                        className="ui primary tiny right floated labeled icon button"
                        style={{'marginRight': '10px'}}
                        href={FlowRouter.path('itemCreate', {containerId: this.props.container._id})}>
                        <i className="plus icon"></i>
                        create {pluralize(this.props.container.name.toLowerCase(), 1)}
                    </a>
                    <div className="ui middle aligned divided link list" style={{'marginTop': '40px'}}>
                        {this.renderAllItems()}
                    </div>
                </div>
                <div className="eleven wide column" style={{'paddingLeft': '0'}}>
                    <div className="content-wrapper" style={{'padding': '25px 35px !important'}}>

                        {!this.props.isContainerView ?
                            <div>
                                <div className="ui grid">
                                    <div className="ten wide column">
                                        {/*<div className="ui large header" style={{'color': '#8b8e90', 'fontWight': '400'}}>
                                         <span style={{'color':'#46a290', 'textDecoration':'underline'}}>Item</span> Is Stored inside your <span style={{'color':'#f15952', 'textDecoration':'underline'}}>{this.props.container.name}</span> container
                                         </div>*/}
                                    </div>
                                    <div className="six wide right aligned column">
                                        <button
                                            className="small ui positive right labeled icon button"
                                            onClick={this.doSubmit}>
                                            <i className="save icon"></i>
                                            Save
                                        </button>
                                        {!_.isUndefined(this.props.item) ?
                                            <a className="small ui negative right labeled icon button" onClick={() => this.deleteItem()}>
                                                <i className="trash outline icon"></i>
                                                Delete
                                            </a>:''}
                                    </div>
                                </div>
                                <div className="ui divider"></div>
                                <div className="ui form item">
                                    {this.loadFields()}
                                    <div className="ui error message"></div>
                                </div>
                            </div>
                            :
                            <div className="ui center aligned piled segment">
                                <p>No item selected.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
};
