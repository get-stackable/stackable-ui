var fieldTypes = [
    {
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
    }
];

ContainerUpdateForm = class ContainerUpdateForm extends React.Component {
    static propTypes = {
        handleSubmit: React.PropTypes.func.isRequired,
        container: React.PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            name: !_.isUndefined(props.container) ? props.container.name : '',
            items: !_.isUndefined(props.container) ? props.container.items : [],
            itemModalVisible: false,
            activeItemInModal: {},
            activeModalTab: 'info'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isUndefined(nextProps.container)) {
            this.setState({
                name: nextProps.container.name,
                items: nextProps.container.items
            });
        }
    }

    openItemModal = (item, activeTab) => {
        this.setState({
            itemModalVisible: true,
            activeItemInModal: item,
            activeModalTab: activeTab
        });
    };

    updateItem(item) {
        let items = this.state.items;

        //find in array
        let index = lodash.findIndex(items, {_id: item._id});
        if (index == '-1') {
            //new item
            items.push(item);
        } else {
            //update item
            items[index] = item;
        }

        this.setState({items});
    };

    deleteContainer() {
        Meteor.call('container.delete', this.props.container._id, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Container deleted successfully!');
                FlowRouter.go('containersList', {appId: this.props.container.appId});
            }
        });
    }

    loadPreviewFields() {
        return this.state.items.map((schema) => {
            console.log(schema);
            return (
                <div className="field" key={schema._id}>
                    <label style={{'color':'#34383c','fontWeight':'400'}}>{schema.name}</label>
                    {schema.type === 'text' ?
                        <TextInput
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
                    {schema.type === 'number' ?
                        <NumberInput
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
                    {schema.type === 'textArea' ?
                        <MarkdownEditor
                            text=""
                            onChange={() => console.log('on change...')}
                            className="mardown-editor-container"
                            options={{toolbar: {diffTop: -55}}}/> : ''}
                    {schema.type === 'boolean' ?
                        <BooleanInput
                            name="test-boolean"
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
                    {schema.type === 'json' ?
                        <JsonInput
                            name="test-json"
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
                    {schema.type === 'enom' ?
                        <EnomInput
                            name="test-enom"
                            value=""
                            onChange={() => console.log('on change...')}/> : ''}
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
                            Containers
                        </h3>
                        <a className="ui orange button item">
                            Containers Tools
                        </a>
                        {!_.isUndefined(this.props.container) ?
                        <a className="ui button item" href={FlowRouter.path('containerCreate', {appId: this.props.container.appId})}>
                            Create Containers
                        </a>:''}
                        {!_.isUndefined(this.props.container) ?
                        <a className="ui button item" href={FlowRouter.path('containersList', {appId: this.props.container.appId})}>
                            View Containers
                        </a>:''}
                        {!_.isUndefined(this.props.container) ?
                        <ConfirmModal
                            buttonText="Delete Container"
                            buttonClass="ui button item"
                            modalTitle="Do you want to delete this container?"
                            modalDescription={`All related ${this.state.items.length} items will be also deleted!`}
                            accepted={() => this.deleteContainer()}/>:''}

                        <div className="item" style={{'textAlign': 'center'}}>
                            <small>With great power comes great responsibility</small>
                        </div>
                    </div>
                </div>
                <div className="fourteen wide column" style={{'paddingLeft': '0'}}>
                    <div className="content-wrapper" style={{'padding': '25px 35px !important'}}>
                        <div className="ui grid">
                            <div className="ten wide column">
                                <div className="ui form">
                                    <BigTitleInput
                                        label="type container name here"
                                        name="name"
                                        value={this.state.name}
                                        onChange={(e) => this.setState({name: e.target.value})}/>
                                </div>
                            </div>
                            <div className="six wide right aligned column">
                                <button className="ui right labeled icon green button"
                                        onClick={this.props.handleSubmit.bind(this, this.state)}>
                                    <i className="save icon"></i>
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="ui divider"></div>
                        <div className="ui stackable tabs menu">
                            {fieldTypes.map((item) => {
                                return <a key={item.value} className="item"
                                          onClick={this.openItemModal.bind(this, {type: item.value}, 'info')}>{item.title}</a>
                            })}
                        </div>
                        <div className="ui divider"></div>
                        <div className="ui grid">
                            <div className="eight wide column">
                                <table className="ui basic celled table" style={{'marginTop': '50px'}}>
                                    <tbody>
                                    {this.state.items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td width="50%">
                                                    {item.name}
                                            <span style={{'float': 'right', 'color': 'rgba(0,0,0,.4)'}}>
                                                {titleize(item.type)}
                                            </span>
                                                </td>
                                                <td width="25%" style={{'textAlign': 'center'}}>
                                                    <a className="underline" onClick={this.openItemModal.bind(this, item, 'validation')}>validations</a>
                                                </td>
                                                <td width="25%" style={{'textAlign': 'center'}}>
                                                    <a className="underline" onClick={this.openItemModal.bind(this, item, 'info')}>configure</a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                <div className="ui basic segment" style={{'marginTop':'100px'}}>
                                    <p>
                                        Container discribe your data. <span style={{'color':'#51BCA8'}}>select a field type and get ready to rock!</span>
                                    </p>
                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="items-preview">
                                    <div className="ui medium header">
                                        Container Preview
                                    </div>
                                    <div className="ui form">
                                        {this.loadPreviewFields()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContainerItemModal
                    visible={this.state.itemModalVisible}
                    item={this.state.activeItemInModal}
                    toggleModal={() => this.setState({itemModalVisible: false})}
                    update={(item) => this.updateItem(item)}
                    activeTab={this.state.activeModalTab} />
            </div>
        )
    }
}
