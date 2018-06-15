import React from 'react';
import classNames from 'classnames';
import alertify from 'alertify.js';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { isUndefined, sortBy, findIndex } from 'lodash';

import BigTitleInput from './BigTitleInput';
import ContainerFieldModal from './ContainerFieldModal';
import ContactFieldsPreview from './ContactFieldsPreview';

const fieldTypes = [
  {
    id: 1,
    title: 'Text Field',
    value: 'text',
  },
  {
    id: 2,
    title: 'Text Editor',
    value: 'textArea',
  },
  {
    id: 3,
    title: 'Number',
    value: 'number',
  },
  {
    id: 4,
    title: 'Boolean',
    value: 'boolean',
  },
  {
    id: 5,
    title: 'Image Upload',
    value: 'image',
  },
  {
    id: 6,
    title: 'Enom (Select)',
    value: 'enom',
  },
  {
    id: 7,
    title: 'Relations',
    value: 'relation',
  },
];

const createContainerMutation = gql`
  mutation createContainer(
    $appId: ID!
    $name: String! # $fieldName: String # $fieldDescription: String
  ) {
    createContainer(
      appId: $appId
      input: {
        name: $name
        # fields: { name: $fieldName, description: $fieldDescription }
      }
    ) {
      id
      name
    }
  }
`;

// const updateContainerMutation = gql`
//   mutation updateContainer($id: ID!, $fields: ContainerInput) {
//     updateContainer(id: $id, input: { fields: $fields }) {
//       id
//       name
//       ...fields
//     }
//   }
// `;

class ContainerUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: !isUndefined(props.container) ? props.container.name : '',
      fields: !isUndefined(props.container)
        ? sortBy(props.container.fields, 'listing_order')
        : [],
      // isSingleItem: isUndefined(props.container)
      //   ? props.container.isSingleItem
      //   : false,
      fieldModalVisible: false,
      activeFieldInModal: {},
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
      fieldModalVisible: true,
      activeFieldInModal: item,
      activeModalTab: activeTab,
    });
  };

  updateItem(field) {
    const { fields } = this.state;
    console.log('field', field);

    // find in array
    const index = findIndex(fields, { id: field.id });

    if (index === -1) {
      console.log('index', index);
      // new item
      fields.push(field);
    } else {
      // update item
      fields[index] = field;
    }
    // fields.push(field);
    this.setState({ fields });
    console.log('fields', this.state.fields);

    this.handleSubmit();
  }

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

  handleSubmit(mutation) {
    console.log('Final State', this.state);
    if (this.state.fields.length === 0) {
      alertify.log(
        'Please create at least one field in order to save container.',
      );
    }
    // mutation({
    //   variables: {
    //     appId: '5ae456acde474d490108aab8',
    //     input: {
    //       name: this.state.name,
    //       // ...this.state.fields,
    //     },
    //   },
    // });

    // alertify.log(this.state.name);
    // submit with bit delay
    // Meteor.setTimeout(() => this.props.handleSubmit(this.state), 500);
  }

  render() {
    // const { location } = this.props;

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
                    {createContainer => (
                      <React.Fragment>
                        <BigTitleInput
                          label="type container name here"
                          name="name"
                          value={this.state.name}
                          onChange={e =>
                            this.setState({ name: e.target.value })
                          }
                        />
                        <div className="six wide right aligned column">
                          <button
                            className="ui right labeled icon green button"
                            onClick={() => this.handleSubmit(createContainer)}
                          >
                            <i className="save icon" />
                            Save
                          </button>
                        </div>
                      </React.Fragment>
                    )}
                  </Mutation>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="ui horizontal divider">select input type</div>
              <div
                className={classNames('ui inverted dimmer', {
                  active: this.state.name.length === 0,
                })}
              />
            </div>
            <div className="ui stackable tabs menu">
              {fieldTypes.map(item => (
                <a
                  className="item"
                  key={item.id}
                  onClick={() =>
                    this.openItemModal({ type: item.value }, 'info')
                  }
                >
                  {item.title}
                </a>
              ))}
            </div>
            <div className="ui horizontal divider">setup container inputs</div>
            <div className="ui grid">
              <div className="eight wide column">
                {/* <table
                  className="ui basic celled table"
                  style={{ marginTop: '50px' }}
                >
                  <tbody ref="containerItems" id="containerItems">
                    TODO: map container item
                    bsdhv
                  </tbody>
                </table> */}
              </div>
              <div className="eight wide column">
                <ContactFieldsPreview items={this.state.fields} />
              </div>
            </div>
          </div>
        </div>
        <ContainerFieldModal
          visible={this.state.fieldModalVisible}
          item={this.state.activeFieldInModal}
          toggleModal={() => this.setState({ fieldModalVisible: false })}
          update={field => this.updateItem(field)}
          activeTab={this.state.activeModalTab}
          // siblingContainers={this.data.siblingContainers}
          allItems={this.state.fields}
        />
      </div>
    );
  }
}

export default ContainerUpdateForm;
