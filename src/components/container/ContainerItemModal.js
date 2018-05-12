/* global $:true */
import React from 'react';
// import PropTypes from 'prop-types';
// import {isUndefined} from 'underscore';
import classNames from 'classnames';
import { upperFirst } from 'lodash';

import InfoForm from './form/InfoForm';
import ValidationForm from './form/ValidationForm';
import RelationForm from './form/RelationForm';

class ContainerItemModal extends React.Component {
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

  constructor(props) {
    super(props);

    // this.state = this.updateState(props);
    this.state = {
      activeTab: '',
      type: '',
    };
  }

  // componentDidMount() {
  //   $('#container-item-edit-tab .item').tab();
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState(this.updateState(nextProps));
  // }
  // TODO:
  //   updateState(props) {
  //       return {
  //           _id: props.item._id || Random.id(6),
  //           name: props.item.name || '',
  //           description: props.item.description || '',
  //           type: props.item.type || 'text',
  //           validations: props.item.validations || {},
  //           relations: props.item.relations || {},
  //           isRequired: props.item.isRequired || false,
  //           isDisabled: props.item.isDisabled || false,
  //           listing_order: props.item.listing_order || props.allItems.length + 1,
  //           activeTab: props.activeTab || 'info'
  //       }
  //   }

  // componentDidUpdate() {
  //   const self = this;
  //   $('#container-item-modal')
  //     .modal({
  //       detachable: false,
  //       onHidden() {
  //         self.props.toggleModal();
  //       },
  //     })
  //     .modal(this.props.visible ? 'show' : 'hide');
  // }
  // TODO:
  //   createSlug(name) {
  //       return s.camelize(s.slugify(name), true);
  //   }

  //   handleSubmit = () => {
  //       const {_id, name, description, type, validations, relations, isRequired, isDisabled, listing_order} = this.state;
  //       const slug = this.createSlug(name);

  //       if (name.length === 0) {
  //           FlashMessages.sendError('Please type in field name');
  //           return;
  //       }

  //       if (type === 'relation') {
  //           if (_.isUndefined(relations.relation_id)
  //               || _.isUndefined(relations.relation_field)
  //               || relations.relation_id.length === 0
  //               || relations.relation_field.length === 0) {
  //               FlashMessages.sendError('Please select relation first in order to continue.');
  //               this.setState({
  //                   activeTab: 'relation'
  //               });
  //               return
  //           }
  //       }

  //       if (type === 'enom') {
  //           if (_.isUndefined(validations.options) || validations.options.length === 0) {
  //               FlashMessages.sendError('Please set options for select input.');
  //               this.setState({
  //                   activeTab: 'validation'
  //               });
  //               return
  //           }
  //       }

  //       // check if field already exists with same name
  //       const exists = lodash.find(this.props.allItems, {name});
  //       if (!_.isUndefined(exists) && exists._id !== _id) {
  //           FlashMessages.sendError(`Field with same name "${name}" already exists`);
  //           return;
  //       }

  //       // check if field `name` is changed, then rename in all items related to this
  //       if (!_.isUndefined(this.props.container) && name !== this.props.item.name) {
  //           Meteor.call('container.field.rename', this.props.container._id, this.props.item.name, name, (err) => {
  //               if (!err) {
  //                   console.log('renamed all data for this field')
  //               }
  //           });
  //       }

  //       this.props.update({_id, name, slug, description, type, validations, relations, isRequired, isDisabled, listing_order});
  //       this.props.toggleModal();
  //   };

  //   renderRelationFields() {
  //       if (isUndefined(this.state.relations.relation_id)) {
  //           return;
  //       }

  //       const relation = Container.findOne(this.state.relations.relation_id);

  //       return (
  //         <div className="fields">
  //           <label>Relation Field</label>
  //           {relation.items.map((item) => (
  //             <div className="field" key={item._id}>
  //               <div className="ui radio checkbox">
  //                 <input
  //                   type="radio"
  //                   name="relation_field"
  //                   value={item.slug}
  //                   checked={item.slug === this.state.relations.relation_field ? 'checked' : false}
  //                   onChange={(e) => this.setState({relations: {relation_id: relation._id, relation_field: e.target.value}})}
  //                 />
  //                 <label>{item.name}</label>
  //               </div>
  //             </div>
  //                   ))}
  //         </div>
  //       )
  //   }

  render() {
    // TODO:
    //   let customValidationsFields = null;

    //   if (this.state.type === 'text' || this.state.type === 'number' || this.state.type === 'textArea') {
    //       customValidationsFields = (<TextFieldValidations
    //         value={this.state.validations}
    //         onChange={(validations) => this.setState({validations})}
    //         showType={this.state.type === 'text'}
    //       />);
    //   }

    //   if (this.state.type === 'enom') {
    //       customValidationsFields = (<EnomFieldValidations
    //         value={this.state.validations}
    //         onChange={(validations) => this.setState({validations})}
    //       />);
    //   }

    return (
      <div
        className="ui modal"
        id="container-item-modal"
        style={{ paddingLeft: '0', paddingRight: '0' }}
      >
        <div className="header">
          <img src="/images/logo.png" alt="logo" />
          {/* {this.state.name.length === 0 ? 'Create' : 'Update'}{' '} */}
          Create
          {upperFirst(this.state.type)} Field
          {/* <i className="close icon" onClick={() => this.props.toggleModal()} /> */}
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
            {this.state.type === 'relation' ? (
              <a
                className={classNames('item', {
                  active: this.state.activeTab === 'relation',
                })}
                data-tab="validations"
                onClick={() => this.setState({ activeTab: 'relation' })}
              >
                Relations
              </a>
            ) : (
              ''
            )}
          </div>
          <div
            className={classNames('ui tab', {
              active: this.state.activeTab === 'info',
            })}
            data-tab="info"
          >
            <InfoForm />
          </div>
          <div
            className={classNames('ui tab', {
              active: this.state.activeTab === 'validation',
            })}
            data-tab="validation"
          >
            <ValidationForm />
          </div>
          {this.state.type === 'relation' ? (
            <div
              className={classNames('ui tab', {
                active: this.state.activeTab === 'relation',
              })}
              data-tab="relation"
            >
              <RelationForm />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default ContainerItemModal;
