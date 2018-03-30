import React from 'react';
// import PropTypes from 'prop-types';

class RelationInput extends React.Component {
    static defaultProps = {
        isRequired: false
    };

// TODO:
//    PropTypes = {
//         relations: PropTypes.object.isRequired,
//         onChange: PropTypes.func,
//         value: PropTypes.any,
//         isRequired: PropTypes.bool
//     };

//     getMeteorData() {
//         const data = {loading: true};

//         const user = User.findOne(Meteor.userId());
//         const Item = !_.isUndefined(user) && user.isPaid ? ItemPaid : ItemFree;

//         const handle = Meteor.subscribe('containers.single', this.props.relations.relation_id);
//         if (handle.ready()) {
//             const container = Container.findOne(this.props.relations.relation_id);
//             data.relationContainer = container;
//             const handle2 = Meteor.subscribe('items.all', container.appId, this.props.relations.relation_id);
//             data.relationItems = Item.find({containerId: this.props.relations.relation_id}).fetch();
//             data.loading = !handle.ready() || !handle2.ready();
//         }

//         return data;
//     }

//     componentDidUpdate() {
//         const self = this;
//         const defaultText = !_.isUndefined(self.props.value) && !_.isNull(self.props.value) && !_.isUndefined(self.props.value.data) ? self.props.value.data[self.props.relations.relation_field] : '';
//         $(`#relation-${this.props.name}`)
//             .dropdown('set text', defaultText)
//             .dropdown({
//                 onChange(value) {
//                     let item = self.data.relationItems[value];
//                     self.props.onChange({_id: item._id, containerId: item.containerId, data: item.data});
//                 }
//             });
//     }

    render() {
        if (this.data.loading) {
            // return <Loading active /> TODO:
        }

        return (
          <div className="ui fluid search selection dropdown relation" id={`relation-${this.props.name}`}>
            <input type="hidden" name="country" />
            <i className="dropdown icon" />
            <div className="default text">Select item</div>
            <div className="menu">
              {this.data.relationItems.map((item, index) => <div className="item" key={item.id} data-value={index}>{item.data[this.props.relations.relation_field]}</div>)}
            </div>
          </div>
        )
    }
};

// reactMixin(RelationInput.prototype, ReactMeteorData); TODO:

export default RelationInput;