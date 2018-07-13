import React from 'react';

import ItemFieldsView from './ItemFieldsView';

class ItemUpdateForm extends React.Component {
  render() {
    return (
      <div
        className="eleven wide column"
        // className={classNames({
        //   'fourteen wide column': this.props.container.isSingleItem,
        //   'eleven wide column': !this.props.container.isSingleItem,
        // })}
        style={{ paddingLeft: '0' }}
      >
        <div className="content-wrapper" style={{ padding: '25px 35px' }}>
          <div>
            <div className="ui grid">
              <div className="ten wide column">
                {/* <div className="ui large header" style={{'color': '#8b8e90', 'fontWight': '400'}}>
                                         <span style={{'color':'#46a290', 'textDecoration':'underline'}}>Item</span> Is Stored inside your <span style={{'color':'#f15952', 'textDecoration':'underline'}}>{this.props.container.name}</span> container
                                         </div> */}
              </div>
              <div className="six wide right aligned column">
                <button
                  className="small ui positive right labeled icon button"
                  onClick={this.doSubmit}
                >
                  <i className="save icon" />
                  Save
                </button>
                <a
                  className="small ui negative right labeled icon button"
                  onClick={() => this.deleteItem()}
                >
                  <i className="trash outline icon" />
                  Delete
                </a>
              </div>
            </div>
            <div className="ui divider" />
            <div className="ui form item">
              <ItemFieldsView />
              <div className="ui error message" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemUpdateForm;
