import React from 'react';
import classNames from 'classnames';
import alertify from 'alertify.js';
import { isUndefined, sortBy, findIndex, startCase } from 'lodash';
import dragula from 'dragula';

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

class ContainerUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: !isUndefined(props.container) ? props.container.name : '',
      fields: !isUndefined(props.container)
        ? sortBy(props.container.fields, 'listingOrder')
        : [],
      isSingleItem: isUndefined(props.container)
        ? props.container.isSingleItem
        : false,
      fieldModalVisible: false,
      activeFieldInModal: {},
      activeModalTab: 'info',
    };
  }

  componentDidMount() {
    const drake = dragula([document.getElementById('containerItems')]);
    drake.on('dragend', el => {
      this.reOrderItems();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (isUndefined(nextProps.container)) {
      this.setState({
        name: nextProps.container.name,
        fields: nextProps.container.fields,
        isSingleItem: nextProps.container.isSingleItem,
      });
    }
  }

  reOrderItems() {
    // const items = this.state.fields;
    // const self = this;
    // const children = $('#containerItems').children();
    // children.each(function(index) {
    //   const order = index + 1;
    //   const itemId = $(this).data('id');
    //   console.log(order, itemId);
    //   console.log(self.state.fields);
    //   // find in array
    //   const itemIndex = findIndex(self.state.fields, { id: itemId });
    //   const item = items[itemIndex];
    //   item.listingOrder = order;
    //   items[itemIndex] = item;
    //   self.setState({ fields: items });
    // });
    // this.handleSubmit();
  }

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
    // console.log('field', field);

    // find in array
    const index = findIndex(fields, { id: field.id });

    if (index === -1) {
      // new item
      fields.push(field);
    } else {
      // update item
      fields[index] = field;
    }
    // fields.push(field);
    this.setState({ fields });

    this.handleSubmit();
  }

  deleteContainer() {
    // const appId = this.props.container.appId;
    alertify.confirm(
      'Do you want to delete this container?',
      `All related ${this.state.items.length} items will be also deleted!`,
      // () => {
      //   Meteor.call('container.delete', this.props.container._id, err => {
      //     if (!err) {
      //       FlashMessages.sendSuccess('Container deleted successfully!');
      //       FlowRouter.go('containersList', { appId });
      //     }
      //   });
      // },
      () => {
        // cancel
      },
    );
  }

  removeItem(item, index) {
    alertify.confirm(
      'Do you want to remove this field?',
      'All related data for this field in items will be also deleted!',
      () => {
        const items = this.state.fields;
        items.splice(index, 1);
        this.setState({ fields: items });
        this.handleSubmit();

        // Meteor.call(
        //   'container.field.archive',
        //   this.props.container._id,
        //   item.name,
        //   err => {
        //     if (!err) {
        //       console.log('archived all data for this field');
        //     }
        //   },
        // );
      },
      () => {
        // cancel
      },
    );
  }

  handleSubmit() {
    if (this.state.fields.length === 0) {
      alertify.log(
        'Please create at least one field in order to save container.',
      );
    }
    this.props.mutation({ ...this.state });

    // alertify.log(this.state.name);
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
                  <BigTitleInput
                    label="type container name here"
                    name="name"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
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
                <div className="eight wide column">
                  <table
                    className="ui basic celled table"
                    style={{ marginTop: '50px' }}
                  >
                    <tbody id="containerItems">
                      {this.state.fields.map((field, index) => (
                        <tr key={field.id} data-id={field.id}>
                          <td width="4%">
                            <i
                              className="minus icon"
                              onClick={() => this.removeItem(field, index)}
                            />
                          </td>
                          <td width="46%">
                            {field.name}
                            <span
                              style={{
                                float: 'right',
                                color: 'rgba(0,0,0,.4)',
                              }}
                            >
                              {startCase(field.type)}
                            </span>
                          </td>
                          <td width="25%" style={{ textAlign: 'center' }}>
                            {field.type !== 'relation' ? (
                              <a
                                className="underline"
                                onClick={() =>
                                  this.openItemModal(field, 'validation')
                                }
                              >
                                {' '}
                                validations
                              </a>
                            ) : (
                              <a
                                className="underline"
                                onClick={() =>
                                  this.openItemModal(field, 'relation')
                                }
                              >
                                relations
                              </a>
                            )}
                          </td>
                          <td width="25%" style={{ textAlign: 'center' }}>
                            <a
                              className="underline"
                              onClick={() => this.openItemModal(field, 'info')}
                            >
                              configure
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="ui piled segment">
                    You can drag and drop fields above to re-order them.
                  </div>
                  <div className="ui piled segment">
                    <div className="ui toggle checkbox">
                      <input
                        name="isSingleItem"
                        type="checkbox"
                        value={this.state.isSingleItem}
                        onChange={e =>
                          this.setState({ isSingleItem: e.target.checked })
                        }
                        onBlur={() => this.handleSubmit()}
                        checked={this.state.isSingleItem}
                      />
                      <label>Is single item container?</label>
                    </div>
                  </div>
                  <div
                    className="ui basic segment"
                    style={{ marginTop: '100px' }}
                  >
                    <p>
                      Container describe your data.{' '}
                      <span style={{ color: '#51BCA8' }}>
                        Select a field type and get ready to rock!
                      </span>
                    </p>
                  </div>
                </div>
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
