import React from 'react';
import classNames from 'classnames';
import alertify from 'alertify.js';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { isUndefined } from 'lodash';

import BigTitleInput from './BigTitleInput';
import ContainerItemModal from './ContainerItemModal';

const fieldTypes = [
  {
    title: 'Text Field',
    value: 'text',
  },
  {
    title: 'Text Editor',
    value: 'textArea',
  },
  {
    title: 'Number',
    value: 'number',
  },
  {
    title: 'Boolean',
    value: 'boolean',
  },
  {
    title: 'Image Upload',
    value: 'image',
  },
  {
    title: 'Enom (Select)',
    value: 'enom',
  },
  {
    title: 'Relations',
    value: 'relation',
  },
];

const createContainerMutation = gql`
  mutation createContainer($appId: ID!, $name: String!) {
    createContainer(appId: $appId, input: { name: $name }) {
      id
      name
    }
  }
`;

class ContainerUpdateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: !isUndefined(props.container) ? props.container.name : '',
      // items: !_.isUndefined(props.container)
      //   ? _.sortBy(props.container.items, 'listing_order')
      //   : [],
      // isSingleItem: !_.isUndefined(props.container)
      //   ? props.container.isSingleItem
      //   : false,
      itemModalVisible: true,
      activeItemInModal: {},
      activeModalTab: 'info',
    };
  }

  // getMeteorData() {
  //   const handle = Meteor.subscribe('containers.all', this.props.appId);

  //   const siblingFind = { appId: this.props.appId };
  //   if (!_.isUndefined(this.props.container)) {
  //     siblingFind._id = { $ne: this.props.container._id };
  //   }
  //   return {
  //     loading: !handle.ready(),
  //     siblingContainers: Container.find(siblingFind).fetch(),
  //   };
  // }

  // componentDidMount() {
  //   const drake = dragula([ReactDOM.findDOMNode(this.refs.containerItems)]);

  //   drake.on('dragend', el => {
  //     this.reOrderItems();
  //   });
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (!_.isUndefined(nextProps.container)) {
  //     this.setState({
  //       name: nextProps.container.name,
  //       items: nextProps.container.items,
  //       isSingleItem: nextProps.container.isSingleItem,
  //     });
  //   }
  // }

  // reOrderItems() {
  //   const items = this.state.items;
  //   const self = this;
  //   const children = $('#containerItems').children();

  //   children.each(function(index) {
  //     const order = index + 1;
  //     const itemId = $(this).data('id');
  //     // console.log(order, itemId);
  //     // console.log(self.state.items);
  //     // find in array
  //     const itemIndex = lodash.findIndex(self.state.items, { _id: itemId });
  //     const item = items[itemIndex];
  //     item.listing_order = order;
  //     items[itemIndex] = item;

  //     self.setState({ items });
  //   });

  //   this.handleSubmit();
  // }

  openItemModal = (item, activeTab) => {
    // trackEvent('Creating Container Field');

    this.setState({
      itemModalVisible: true,
      activeItemInModal: item,
      activeModalTab: activeTab,
    });
  };

  // updateItem(item) {
  //   const items = this.state.items;

  //   // find in array
  //   const index = lodash.findIndex(items, { _id: item._id });

  //   if (index == '-1') {
  //     // new item
  //     items.push(item);
  //   } else {
  //     // update item
  //     items[index] = item;
  //   }

  //   this.setState({ items });

  //   this.handleSubmit();
  // }

  // deleteContainer() {
  //   const appId = this.props.container.appId;
  //   alertify.confirm(
  //     'Do you want to delete this container?',
  //     `All related ${this.state.items.length} items will be also deleted!`,
  //     () => {
  //       Meteor.call('container.delete', this.props.container._id, err => {
  //         if (!err) {
  //           FlashMessages.sendSuccess('Container deleted successfully!');
  //           FlowRouter.go('containersList', { appId });
  //         }
  //       });
  //     },
  //     () => {
  //       // cancel
  //     },
  //   );
  // }

  // removeItem(item, index) {
  //   alertify.confirm(
  //     'Do you want to remove this field?',
  //     'All related data for this field in items will be also deleted!',
  //     () => {
  //       const items = this.state.items;
  //       items.splice(index, 1);
  //       this.setState({ items });
  //       this.handleSubmit();

  //       Meteor.call(
  //         'container.field.archive',
  //         this.props.container._id,
  //         item.name,
  //         err => {
  //           if (!err) {
  //             console.log('archived all data for this field');
  //           }
  //         },
  //       );
  //     },
  //     () => {
  //       // cancel
  //     },
  //   );
  // }

  handleSubmit(createApplication) {
    // if (this.state.items.length === 0) {
    //   alertify.log(
    //     'Please create at least one field in order to save container.',
    //   );
    // }

    createApplication({
      variables: { appId: '5ae456acde474d490108aab8', name: this.state.name },
    });

    alertify.log(this.state.name);
    // submit with bit delay
    // Meteor.setTimeout(() => this.props.handleSubmit(this.state), 500);
  }

  render() {
    return (
      <div className="ui grid full-height" style={{ marginLeft: '0' }}>
        <div className="two wide column side-sub-menu">
          <div className="ui left vertical menu">
            <h3 className="ui header item">Containers</h3>
            <a className="ui orange button item">Containers Tools</a>
            <a className="ui button item" href="/containers">
              View Containers
            </a>
            <a
              className="ui button item"
              // onClick={() => this.deleteContainer()}
            >
              Delete Container
            </a>
            <div className="item" style={{ textAlign: 'center' }}>
              <small>With great power comes great responsibility</small>
            </div>
          </div>
        </div>
        <div className="fourteen wide column" style={{ paddingLeft: '0' }}>
          <div className="content-wrapper" style={{ padding: '25px 35px' }}>
            <div className="ui grid">
              <div className="ten wide column">
                <div className="ui form">
                  <Mutation mutation={createContainerMutation}>
                    {createApplication => (
                      <React.Fragment>
                        <BigTitleInput
                          label="type container name here"
                          name="name"
                          value={this.state.name}
                          onChange={e =>
                            this.setState({ name: e.target.value })
                          }
                          onBlur={() => this.handleSubmit(createApplication)}
                        />
                      </React.Fragment>
                    )}
                  </Mutation>
                  <div className="six wide right aligned column">
                    <button
                      className="ui right labeled icon green button"
                      onClick={() => this.handleSubmit()}
                    >
                      <i className="save icon" />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="ui horizontal divider">select input type</div>
              <div
                className={classNames('ui inverted dimmer', {
                  // active: this.state.name.length === 0,
                })}
              />
            </div>
            <div className="ui stackable tabs menu">
              {fieldTypes.map((item, index) => (
                <a
                  className="item"
                  key={index.id}
                  onClick={this.openItemModal.bind(
                    this,
                    { type: item.value },
                    'info',
                  )}
                >
                  {item.title}
                </a>
              ))}
            </div>
            <div className="ui horizontal divider">setup container inputs</div>
            <div className="ui grid">
              <div className="eight wide column">
                <table
                  className="ui basic celled table"
                  style={{ marginTop: '50px' }}
                >
                  <tbody ref="containerItems" id="containerItems">
                    {/* TODO: map container item  */}
                    bsdhv
                  </tbody>
                </table>
              </div>
              <div className="eight wide column">
                bcsmdbm
                {/* <ContactFieldsPreview items={this.state.items} /> */}
              </div>
            </div>
          </div>
        </div>
        <ContainerItemModal
          visible={this.state.itemModalVisible}
          // item={this.state.activeItemInModal}
          toggleModal={() => this.setState({ itemModalVisible: false })}
          // update={item => this.updateItem(item)}
          // activeTab={this.state.activeModalTab}
          // siblingContainers={this.data.siblingContainers}
          // allItems={this.state.items}
          // container={this.props.container}
        />
      </div>
    );
  }
}

export default ContainerUpdateForm;
