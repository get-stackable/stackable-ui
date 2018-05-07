import React from 'react';
import classNames from 'classnames';

import BigTitleInput from './BigTitleInput';

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

class ContainerUpdateForm extends React.Component {
  render() {
    return (
      <div className="ui grid full-height" style={{ marginLeft: '0' }}>
        <div className="two wide column side-sub-menu">
          <div className="ui left vertical menu">
            <h3 className="ui header item">Containers</h3>
            <a className="ui orange button item">Containers Tools</a>
            <a
              className="ui button item"
              // href={FlowRouter.path('containersList', {
              //   appId: this.props.appId,
              // })}
            >
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
          <div
            className="content-wrapper"
            style={{ padding: '25px 35px !important' }}
          >
            <div className="ui grid">
              <div className="ten wide column">
                <div className="ui form">
                  <BigTitleInput
                    label="type container name here"
                    name="name"
                    // value={this.state.name}
                    // onChange={e => this.setState({ name: e.target.value })}
                    // onBlur={() => this.handleSubmit()}
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
                  // active: this.state.name.length === 0,
                })}
              />
            </div>
            <div className="ui stackable tabs menu">
              {fieldTypes.map(item => <a className="item">{item.title}</a>)}
            </div>
            <div className="ui horizontal divider">setup container inputs</div>
            <div className="ui grid">
              <div className="eight wide column">
                <table
                  className="ui basic celled table"
                  style={{ marginTop: '50px' }}
                >
                  <tbody ref="containerItems" id="containerItems">
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
        {/* <ContainerItemModal
          visible={this.state.itemModalVisible}
          item={this.state.activeItemInModal}
          toggleModal={() => this.setState({ itemModalVisible: false })}
          update={item => this.updateItem(item)}
          activeTab={this.state.activeModalTab}
          siblingContainers={this.data.siblingContainers}
          allItems={this.state.items}
          container={this.props.container}
        /> */}
      </div>
    );
  }
}

export default ContainerUpdateForm;
