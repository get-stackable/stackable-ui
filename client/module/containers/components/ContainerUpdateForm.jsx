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
        title: 'Image Upload',
        value: 'image'
    }, {
        title: 'Json',
        value: 'json'
    }, {
        title: 'Enom (Select)',
        value: 'enom'
    }, {
        title: 'Relations',
        value: 'relation'
    }
];

ContainerUpdateForm = class ContainerUpdateForm extends React.Component {
    static propTypes = {
        handleSubmit: React.PropTypes.func.isRequired,
        container: React.PropTypes.object,
        appId: React.PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            name: !_.isUndefined(props.container) ? props.container.name : '',
            items: !_.isUndefined(props.container) ? _.sortBy(props.container.items, 'listing_order') : [],
            itemModalVisible: false,
            activeItemInModal: {},
            activeModalTab: 'info'
        };
    }

    getMeteorData() {
        let handle = Meteor.subscribe('containers.all', this.props.appId);

        let siblingFind = {appId: this.props.appId};
        if (!_.isUndefined(this.props.container)) {
            siblingFind['_id'] = {$ne: this.props.container._id};
        }
        return {
            loading: !handle.ready(),
            siblingContainers: Container.find(siblingFind).fetch()
        };
    }

    componentDidMount() {
        let drake = dragula([ReactDOM.findDOMNode(this.refs.containerItems)]);

        drake.on('dragend', (el) => {
            this.reOrderItems();
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isUndefined(nextProps.container)) {
            this.setState({
                name: nextProps.container.name,
                items: nextProps.container.items
            });
        }
    }

    reOrderItems() {
        let items = this.state.items;
        var self = this;
        var children = $('#containerItems').children();

        children.each(function (index) {
            let order = index + 1;
            let itemId = $(this).data('id');
            //console.log(order, itemId);
            //console.log(self.state.items);
            //find in array
            let itemIndex = lodash.findIndex(self.state.items, {_id: itemId});
            let item = items[itemIndex];
            item['listing_order'] = order;
            items[itemIndex] = item;

            self.setState({items});
        });

        this.handleSubmit();
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

        this.handleSubmit();
    };

    deleteContainer() {
        Meteor.call('container.delete', this.props.container._id, (err) => {
            if (!err) {
                FlashMessages.sendSuccess('Container deleted successfully!');
                FlowRouter.go('containersList', {appId: this.props.container.appId});
            }
        });
    }

    removeItem(item, index) {
        let items = this.state.items;

        items.splice(index, 1);

        this.setState({items});

        this.handleSubmit();
    }

    handleSubmit() {
        if (this.state.items.length === 0) {
            FlashMessages.sendInfo('Please create at least one field in order to save container.');
            return;
        }
        //submit with bit delay
        Meteor.setTimeout(() => this.props.handleSubmit(this.state), 500);
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
                                        onChange={(e) => this.setState({name: e.target.value})}
                                        onBlur={() => this.handleSubmit()}/>
                                </div>
                            </div>
                            <div className="six wide right aligned column">
                                <button className="ui right labeled icon green button"
                                        onClick={() => this.handleSubmit()}>
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
                                    <tbody ref="containerItems" id="containerItems">
                                    {this.state.items.map((item, index) => {
                                        return (
                                            <tr key={item._id} data-id={item._id}>
                                                <td width="4%">
                                                    <i className="minus icon" onClick={() => this.removeItem(item, index)}></i>
                                                </td>
                                                <td width="46%">
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
                                <div className="ui piled segment">
                                    You can drag and drop fields above to re-order them.
                                </div>
                                <div className="ui basic segment" style={{'marginTop':'100px'}}>
                                    <p>
                                        Container describe your data. <span style={{'color':'#51BCA8'}}>Select a field type and get ready to rock!</span>
                                    </p>
                                </div>
                            </div>
                            <div className="eight wide column">
                                <ContactFieldsPreview items={this.state.items} />
                            </div>
                        </div>
                    </div>
                </div>
                <ContainerItemModal
                    visible={this.state.itemModalVisible}
                    item={this.state.activeItemInModal}
                    toggleModal={() => this.setState({itemModalVisible: false})}
                    update={(item) => this.updateItem(item)}
                    activeTab={this.state.activeModalTab}
                    siblingContainers={this.data.siblingContainers} />
            </div>
        )
    }
};

reactMixin(ContainerUpdateForm.prototype, ReactMeteorData);
