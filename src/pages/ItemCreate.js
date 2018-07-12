import React from 'react';

import Layout from '../components/core/Layout';
import ItemUpdateForm from '../components/items/ItemUpdateForm';

class ItemCreate extends React.Component {
  // componentDidMount() {
  //     trackEvent('Creating Item');
  // }

  // getMeteorData() {
  //     let handle = Meteor.subscribe('containers.single', this.props.containerId);

  //     let user = User.findOne(Meteor.userId());
  //     let Item = !_.isUndefined(user) && user.isPaid ? ItemPaid : ItemFree;

  //     let data = {
  //         loading: true
  //     };

  //     if (handle.ready()) {
  //         let container = Container.findOne({_id: this.props.containerId});
  //         data['container'] = container;
  //         data['app'] = Application.findOne({_id: container.appId});

  //         let handle2 = Meteor.subscribe('items.all', container.appId, container._id);
  //         let handle3 = Meteor.subscribe('containers.all', container.appId);
  //         if (handle2.ready() && handle3.ready()) {
  //             let allItems = Item.find({containerId: container._id}, {sort: {createdAt: -1}}).fetch();
  //             data['allItems'] = allItems;
  //             data['allContainers'] = Container.find({appId: container.appId}, {sort: {createdAt: -1}}).fetch();

  //             if (container.isSingleItem) {
  //                 //if is single item
  //                 this.loadSingleItemContainer(allItems, container._id, container.appId);
  //             } else {
  //                 data['loading'] = false;
  //             }
  //         }
  //     }

  //     return data;
  // }

  // loadSingleItemContainer(allItems, containerId, appId) {
  //     if (allItems.length === 0) {
  //         //create a item if not there
  //         let itemData = {containerId, appId, data: {}};

  //         Meteor.call('item.create', itemData, (err, res) => {
  //             //console.log(err, res);
  //             if (!err) {
  //                 FlowRouter.go('itemUpdate', {id: res.getId()});
  //             } else {
  //                 FlashMessages.sendError(err.reason);
  //             }
  //         });
  //     } else {
  //         //when one item is there
  //         //redirect to it
  //         FlowRouter.go('itemUpdate', {id: allItems[0].getId()});
  //     }
  // }

  // handleSubmit = (data) => {
  //     trackEvent('Created Item');

  //     let formData = {
  //         containerId: this.data.container._id,
  //         appId:  this.data.container.appId,
  //         data: data
  //     };

  //     Meteor.call('item.create', formData, (err, res) => {
  //         //console.log(err, res);
  //         if (!err) {
  //             FlashMessages.sendSuccess('Item created successfully!');
  //             FlowRouter.go('itemUpdate', {id: res.getId()});
  //         } else {
  //             FlashMessages.sendError(err.reason);
  //         }
  //     });
  // };

  render() {
    // if (this.data.loading) {
    //     return <Loading active={true} />
    // }

    return (
      <Layout>
        <ItemUpdateForm />
      </Layout>
    );
  }
}

export default ItemCreate;

// container={this.data.container}
// allItems={this.data.allItems}
// allContainers={this.data.allContainers}
// isContainerView={isUndefined(this.props.isView)}
// app={this.data.app}
// handleSubmit={this.handleSubmit}
