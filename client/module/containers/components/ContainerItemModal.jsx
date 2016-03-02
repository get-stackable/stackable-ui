ContainerItemModal = class ContainerItemModal extends React.Component {
    static propTypes = {
        visible: React.PropTypes.bool.isRequired,
        toggleModal: React.PropTypes.func.isRequired,
        item: React.PropTypes.object.isRequired,
        update: React.PropTypes.func.isRequired,
        activeTab: React.PropTypes.string,
        siblingContainers: React.PropTypes.array.isRequired,
        allItems: React.PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.state = this.updateState(props);
    }

    componentDidMount() {
        $('#container-item-edit-tab .item').tab();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.updateState(nextProps));
    }

    updateState(props) {
        return {
            _id: props.item._id || Random.id(6),
            name: props.item.name || '',
            description: props.item.description || '',
            type: props.item.type || 'text',
            validations: props.item.validations || '',
            relations: props.item.relations || {},
            isRequired: props.item.isRequired || false,
            isDisabled: props.item.isDisabled || false,
            listing_order: props.item.listing_order || props.allItems.length + 1,
            activeTab: props.activeTab || 'info'
        }
    }

    componentDidUpdate() {
        let self = this;
        $('#container-item-modal').modal({
            detachable: false,
            onHidden: function () {
                self.props.toggleModal()
            }
        }).modal(this.props.visible
            ? 'show'
            : 'hide');
    }

    handleSubmit = () => {
        let {_id, name, description, type, validations, relations, isRequired, isDisabled, listing_order} = this.state;

        //todo check if field already exists with same name
        console.log(name);
        console.log(this.props.allItems);
        let exists = lodash.find(this.props.allItems, {name: name});
        if (!_.isUndefined(exists)) {
            FlashMessages.sendError(`Field with same name "${name}" already exists`);
            return;
        }

        this.props.update({_id, name, description, type, validations, relations, isRequired, isDisabled, listing_order});
        this.props.toggleModal();
    };

    renderRelationFields() {
        if (_.isUndefined(this.state.relations.relation_id)) {
            return;
        }

        let relation = Container.findOne(this.state.relations.relation_id);

        return (
            <div className="fields">
                <label>Relation Field</label>
                {relation.items.map((item) => {
                    return (
                        <div className="field" key={item._id}>
                            <div className="ui radio checkbox">
                                <input
                                    type="radio"
                                    name="relation_field"
                                    value={item.name}
                                    checked={item.name === this.state.relations.relation_field ? 'checked' : false}
                                    onChange={(e) => this.setState({relations: {relation_id: relation._id, relation_field: e.target.value}})}/>
                                <label>{item.name}</label>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div className="ui modal" id="container-item-modal" style={{'paddingLeft': '0', 'paddingRight': '0'}}>
                <div className="header">
                    <img src="/images/logo.png"/>
                    {this.state.name.length === 0 ? 'Create' : 'Update'} {titleize(this.state.type)} Item
                    <i className="close icon" onClick={() => this.props.toggleModal()}></i>
                </div>
                <div className="content">
                    <div className="ui pointing secondary menu" id="container-item-edit-tab">
                        <a
                            className={classNames('item', { 'active': this.state.activeTab === 'info'})}
                            data-tab="info"
                            onClick={() => this.setState({activeTab: 'info'})}>
                            Info
                        </a>
                        <a
                            className={classNames('item', { 'active': this.state.activeTab === 'validation'})}
                            data-tab="validations"
                            onClick={() => this.setState({activeTab: 'validation'})}>
                            Validations
                        </a>
                        <a
                            className={classNames('item', { 'active': this.state.activeTab === 'relation'})}
                            data-tab="validations"
                            onClick={() => this.setState({activeTab: 'relation'})}>
                            Relations
                        </a>
                    </div>
                    <div className={classNames('ui tab', { 'active': this.state.activeTab === 'info'})} data-tab="info">
                        <div className="ui form">
                            <div className="field">
                                <label>Item Name</label>
                                <input type="text" name="name" placeholder="Item name" value={this.state.name}
                                       onChange={(e) => this.setState({name: e.target.value})}/>
                            </div>
                            <div className="field">
                                <label>Item Description</label>
                                <input type="text" name="description" placeholder="Item description"
                                       value={this.state.description}
                                       onChange={(e) => this.setState({description: e.target.value})}/>
                            </div>
                            <div className="field">
                                <div className="ui checkbox">
                                    <input type="checkbox" name="isRequired" value={this.state.isRequired}
                                           onChange={(e) => this.setState({isRequired: e.target.value})}/>
                                    <label>Item Required</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui checkbox">
                                    <input type="checkbox" name="isDisabled" value={this.state.isDisabled}
                                           onChange={(e) => this.setState({isDisabled: e.target.value})}/>
                                    <label>Item Disabled</label>
                                </div>
                            </div>
                            <div className="field">
                                <label>Item Listing Order</label>
                                <input type="number" name="listing_order" placeholder="Item Listing Order"
                                       value={this.state.listing_order}
                                       onChange={(e) => this.setState({listing_order: e.target.value})}/>
                            </div>
                            <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                    <div className={classNames('ui tab', { 'active': this.state.activeTab === 'validation'})} data-tab="validation">
                        <div className="ui form">
                            <div className="field">
                                <label>Item Validations</label>
                                <textarea rows="3" name="validations" value={this.state.validations}
                                      onChange={(e) => this.setState({validations: e.target.value})}></textarea>
                            </div>
                            <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                    {this.state.type === 'relation' ?
                    <div className={classNames('ui tab', { 'active': this.state.activeTab === 'relation'})} data-tab="relation">
                        <div className="ui form">
                            <div className="fields">
                                <label>Relation Name</label>
                                {this.props.siblingContainers.map((container) => {
                                    return (
                                        <div className="field" key={container._id}>
                                            <div className="ui radio checkbox">
                                                <input
                                                    type="radio"
                                                    name="relation_id"
                                                    value={container._id}
                                                    checked={container._id === this.state.relations.relation_id ? 'checked' : false}
                                                    onChange={(e) => this.setState({relations: {relation_id: e.target.value}})}/>
                                                <label>{container.name}</label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {this.renderRelationFields()}
                            <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>:''}
                </div>
            </div>
        )
    }
};
