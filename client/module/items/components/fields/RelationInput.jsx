RelationInput = class RelationInput extends React.Component {
    static defaultProps = {
        isRequired: false
    };

    static propTypes = {
        relations: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func,
        value: React.PropTypes.any,
        isRequired: React.PropTypes.bool
    };

    getMeteorData() {
        let data = {loading: true};

        let handle = Meteor.subscribe('containers.single', this.props.relations.relation_id);
        if (handle.ready()) {
            let container = Container.findOne(this.props.relations.relation_id);
            data['relationContainer'] = container;
            let handle2 = Meteor.subscribe('items.all', container.appId, this.props.relations.relation_id);
            data['relationItems'] = Item.find({containerId: this.props.relations.relation_id}).fetch();
            data['loading'] = !handle.ready() || !handle2.ready();
        }

        return data;
    }

    componentDidUpdate() {
        let self = this;
        let defaultText = !_.isUndefined(self.props.value) && !_.isUndefined(self.props.value.data) ? self.props.value.data[self.props.relations.relation_field] : '';
        $('.ui.dropdown.relation')
            .dropdown('set text', defaultText)
            .dropdown({
                onChange: function(value) {
                    let item = self.data.relationItems[value];
                    self.props.onChange({_id: item._id, containerId: item.containerId, data: item.data});
                }
            });
    }

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        return (
            <div className="ui fluid search selection dropdown relation">
                <input type="hidden" name="country" />
                <i className="dropdown icon"></i>
                <div className="default text">Select item</div>
                <div className="menu">
                    {this.data.relationItems.map((item, index) => {
                        return <div className="item" key={item._id} data-value={index}>{item.data[this.props.relations.relation_field]}</div>
                    })}
                </div>
            </div>
        )
    }
};

reactMixin(RelationInput.prototype, ReactMeteorData);
