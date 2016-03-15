ContainerItemModal = class ContainerItemModal extends React.Component {
    static propTypes = {
        visible: React.PropTypes.bool.isRequired,
        toggleModal: React.PropTypes.func.isRequired,
        item: React.PropTypes.object.isRequired,
        update: React.PropTypes.func.isRequired,
        activeTab: React.PropTypes.string,
        siblingContainers: React.PropTypes.array.isRequired,
        allItems: React.PropTypes.array.isRequired,
        container: React.PropTypes.object
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
            validations: props.item.validations || {},
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

    createSlug(name) {
        return s.camelize(s.slugify(name), true);
    }

    handleSubmit = () => {
        let {_id, name, description, type, validations, relations, isRequired, isDisabled, listing_order} = this.state;
        let slug = this.createSlug(name);

        //check if field already exists with same name
        let exists = lodash.find(this.props.allItems, {name: name});
        if (!_.isUndefined(exists) && exists._id !== _id) {
            FlashMessages.sendError(`Field with same name "${name}" already exists`);
            return;
        }

        //check if field `name` is changed, then rename in all items related to this
        if (!_.isUndefined(this.props.container) && name !== this.props.item.name) {
            Meteor.call('container.field.rename', this.props.container._id, this.props.item.name, name, (err) => {
                if (!err) {
                    console.log('renamed all data for this field')
                }
            });
        }

        this.props.update({_id, name, slug, description, type, validations, relations, isRequired, isDisabled, listing_order});
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
                                    value={item.slug}
                                    checked={item.slug === this.state.relations.relation_field ? 'checked' : false}
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
        let customValidationsFields = null;

        if (this.state.type === 'text' || this.state.type === 'number' || this.state.type === 'textArea') {
            customValidationsFields = <TextFieldValidations
                value={this.state.validations}
                onChange={(validations) => this.setState({validations})}
                showType={this.state.type === 'text'}/>;
        }

        if (this.state.type === 'enom') {
            customValidationsFields = <EnomFieldValidations
                value={this.state.validations}
                onChange={(validations) => this.setState({validations})} />;
        }

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
                        {this.state.type === 'relation' ?
                        <a
                            className={classNames('item', { 'active': this.state.activeTab === 'relation'})}
                            data-tab="validations"
                            onClick={() => this.setState({activeTab: 'relation'})}>
                            Relations
                        </a>:''}
                    </div>
                    <div className={classNames('ui tab', {'active': this.state.activeTab === 'info'})} data-tab="info">
                        <div className="ui form">
                            <div className="field">
                                <label>Item Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="itemName"
                                    placeholder="type item name here, eg: Title, Description, Featured Image, Is Active"
                                    value={this.state.name}
                                    onChange={(e) => this.setState({name: e.target.value})}/>
                            </div>
                            <div className="field">
                                <label>Item Description</label>
                                <input type="text" name="description" placeholder="type item description here"
                                       value={this.state.description}
                                       onChange={(e) => this.setState({description: e.target.value})}/>
                            </div>
                            <div className="field">
                                <div className="ui checkbox">
                                    <input
                                        type="checkbox"
                                        name="isDisabled"
                                        checked={this.state.isDisabled}
                                        onChange={(e) => this.setState({isDisabled: e.target.checked})}/>
                                    <label>Item Disabled</label>
                                </div>
                            </div>
                            <div className="ui divider"></div>
                            <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                    <div className={classNames('ui tab', {'active': this.state.activeTab === 'validation'})} data-tab="validation">
                        <div className="ui form">
                            <div className="field">
                                <div className="ui checkbox">
                                    <input
                                        type="checkbox"
                                        name="isRequired"
                                        checked={this.state.isRequired}
                                        onChange={(e) => this.setState({isRequired: e.target.checked})}/>
                                    <label>Item Required</label>
                                </div>
                            </div>

                            {customValidationsFields}

                            <div className="ui divider"></div>
                            <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                    {this.state.type === 'relation' ?
                    <div className={classNames('ui tab', {'active': this.state.activeTab === 'relation'})} data-tab="relation">
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

                            <div className="ui divider"></div>
                            <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>:''}
                </div>
            </div>
        )
    }
};
