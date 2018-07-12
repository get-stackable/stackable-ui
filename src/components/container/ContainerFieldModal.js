/* global $:true */
import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { upperFirst, isUndefined, camelCase, omit, find } from 'lodash';
import alertify from 'alertify.js';

// import InfoForm from './form/InfoForm';
// import ValidationForm from './form/ValidationForm';

import RelationForm from './form/RelationForm';
import TextFieldValidations from './form/TextFieldValidations';
import EnomFieldValidations from './form/EnomFieldValidations';

class ContainerFieldModal extends React.Component {
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

  componentDidUpdate() {
    const self = this;
    $('#container-item-modal')
      .modal({
        detachable: false,
        onHidden() {
          self.props.toggleModal();
        },
      })
      .modal(this.props.visible ? 'show' : 'hide');
  }
  updateState(props) {
    if (isUndefined(props.item)) {
      return {};
    }

    return {
      id: props.item.id || Math.random(),
      name: props.item.name || '',
      slug: props.item.slug || '',
      description: props.item.description || '',
      type: props.item.type || 'text',
      validations: omit(props.item.validations, ['__typename']) || {},
      relations: props.item.relations || {},
      isRequired: props.item.isRequired || false,
      isDisabled: props.item.isDisabled || false,
      // listingOrder: props.item.listingOrder || props.allItems.length + 1,
      activeTab: props.activeTab || 'info',
    };
  }
  // TODO:
  //   createSlug(name) {
  //       return s.camelize(s.slugify(name), true);
  //   }

  handleSubmit = () => {
    const {
      id,
      name,
      // description,
      type,
      validations,
      // relations,
      // isRequired,
      // isDisabled,
      // listing_order,
    } = this.state;

    const { fields } = this.props;

    if (name.length === 0) {
      alertify.error('Please type in field name');
      return;
    }

    // if (type === 'relation') {
    //   if (
    //     _.isUndefined(relations.relation_id) ||
    //     _.isUndefined(relations.relation_field) ||
    //     relations.relation_id.length === 0 ||
    //     relations.relation_field.length === 0
    //   ) {
    //     FlashMessages.sendError(
    //       'Please select relation first in order to continue.',
    //     );
    //     this.setState({
    //       activeTab: 'relation',
    //     });
    //     return;
    //   }
    // }

    if (type === 'enom') {
      if (
        isUndefined(validations.options) ||
        validations.options.length === 0
      ) {
        alertify.error('Please set options for select input.');
        this.setState({
          activeTab: 'validation',
        });
        return;
      }
    }

    // check if field already exists with same name
    const exists = find(fields, { name });
    if (isUndefined(exists) ? '' : exists.id !== id) {
      alertify.error(`Field with same name "${name}" already exists`);
      return;
    }

    // check if field `name` is changed, then rename in all items related to this
    // if (!_.isUndefined(this.props.container) && name !== this.props.item.name) {
    //   Meteor.call(
    //     'container.field.rename',
    //     this.props.container._id,
    //     this.props.item.name,
    //     name,
    //     err => {
    //       if (!err) {
    //         console.log('renamed all data for this field');
    //       }
    //     },
    //   );
    // }

    this.props.update({
      ...this.state,
      slug: camelCase(name),
    });
    this.props.toggleModal();
  };

  // renderRelationFields() {
  //   if (isUndefined(this.state.relations.relation_id)) {
  //     return;
  //   }

  //   const relation = Container.findOne(this.state.relations.relation_id);

  //   return (
  //     <div className="fields">
  //       <label>Relation Field</label>
  //       {relation.items.map(item => (
  //         <div className="field" key={item._id}>
  //           <div className="ui radio checkbox">
  //             <input
  //               type="radio"
  //               name="relation_field"
  //               value={item.slug}
  //               checked={
  //                 item.slug === this.state.relations.relation_field
  //                   ? 'checked'
  //                   : false
  //               }
  //               onChange={e =>
  //                 this.setState({
  //                   relations: {
  //                     relation_id: relation._id,
  //                     relation_field: e.target.value,
  //                   },
  //                 })
  //               }
  //             />
  //             <label>{item.name}</label>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  render() {
    let customValidationsFields = null;
    if (
      this.state.type === 'text' ||
      this.state.type === 'number' ||
      this.state.type === 'textArea'
    ) {
      customValidationsFields = (
        <TextFieldValidations
          value={this.state.validations}
          onChange={validations => this.setState({ validations })}
          showType={this.state.type === 'text'}
        />
      );
    }

    if (this.state.type === 'enom') {
      customValidationsFields = (
        <EnomFieldValidations
          value={this.state.validations}
          onChange={validations => this.setState({ validations })}
        />
      );
    }

    return (
      <div
        className="ui modal"
        id="container-item-modal"
        style={{ paddingLeft: '0', paddingRight: '0' }}
      >
        <div className="header">
          <img src="/images/logo.png" alt="logo" />
          {this.state.name.length === 0 ? 'Create' : 'Update'}
          {upperFirst(this.state.type)} Field
          <a
            onClick={() => this.props.toggleModal()}
            style={{ color: '#ffff' }}
          >
            <i className="close icon" />
          </a>
        </div>
        <div className="content">
          <div
            className="ui pointing secondary menu"
            id="container-item-edit-tab"
          >
            <a
              className={classNames('item', {
                active: this.state.activeTab === 'info',
              })}
              data-tab="info"
              onClick={() => this.setState({ activeTab: 'info' })}
            >
              Info
            </a>
            <a
              className={classNames('item', {
                active: this.state.activeTab === 'validation',
              })}
              data-tab="validations"
              onClick={() => this.setState({ activeTab: 'validation' })}
            >
              Validations
            </a>
            {this.state.type === 'relation' && (
              <a
                className={classNames('item', {
                  active: this.state.activeTab === 'relation',
                })}
                data-tab="validations"
                onClick={() => this.setState({ activeTab: 'relation' })}
              >
                Relations
              </a>
            )}
          </div>
          <div
            className={classNames('ui tab', {
              active: this.state.activeTab === 'info',
            })}
            data-tab="info"
          >
            <div className="ui form">
              <div className="field">
                <label>Field Name</label>
                <input
                  type="text"
                  name="name"
                  id="itemName"
                  placeholder="type field name here, eg: Title, Description, Featured Image, Is Active"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Field Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="type field description here"
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </div>
              <div className="field">
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    name="isDisabled"
                    checked={this.state.isDisabled}
                    onChange={e =>
                      this.setState({ isDisabled: e.target.checked })
                    }
                  />
                  <label>Field Disabled</label>
                </div>
              </div>
              <div className="ui divider" />
              <button
                className="ui primary button"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          <div
            className={classNames('ui tab', {
              active: this.state.activeTab === 'validation',
            })}
            data-tab="validation"
          >
            <div className="ui form">
              <div className="field">
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    name="isRequired"
                    checked={this.state.isRequired}
                    onChange={e =>
                      this.setState({ isRequired: e.target.checked })
                    }
                  />
                  <label>Field Required</label>
                </div>
              </div>
              {customValidationsFields}
              <div className="ui divider" />
              <button
                className="ui primary button"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          {this.state.type === 'relation' && (
            <div
              className={classNames('ui tab', {
                active: this.state.activeTab === 'relation',
              })}
              data-tab="relation"
            >
              <RelationForm />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ContainerFieldModal;

// TODO:
//  PropTypes = {
//       visible: PropTypes.bool.isRequired,
//       toggleModal: PropTypes.func.isRequired,
//       item: PropTypes.object.isRequired,
//       update: PropTypes.func.isRequired,
//       activeTab: PropTypes.string,
//       siblingContainers: PropTypes.array.isRequired,
//       allItems: PropTypes.array.isRequired,
//       container: PropTypes.object
//   };
