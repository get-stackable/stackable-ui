RelationInput = class RelationInput extends React.Component {
    static propTypes = {
        relations: React.PropTypes.object.isRequired
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

    componentDidMount() {
        $('.ui.dropdown.relation').dropdown();
    }

    render() {
        if (this.data.loading) {
            return <Loading active={true} />
        }

        console.log(this.data.relationContainer);
        console.log(this.data.relationItems);

        return (
            <div className="ui fluid search selection dropdown relation">
                <input type="hidden" name="country" />
                <i className="dropdown icon"></i>
                <div className="default text">Select item</div>
                <div className="menu">
                    {this.data.relationItems.map((item) => {
                        return <div className="item" key={item._id} data-value={item._id}>{item.data[this.props.relations.relation_field]}</div>
                    })}
                </div>
            </div>
        )
    }
};

reactMixin(RelationInput.prototype, ReactMeteorData);
