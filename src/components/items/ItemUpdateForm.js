import React from 'react';
import { isUndefined } from 'lodash';

class ItemUpdateForm extends React.Component {
  render() {
    return (
      <div
        className="ui grid full-height item-edit"
        style={{ marginLeft: '0' }}
      >
        <div className="two wide column containers-list">
          <button
            className="fluid ui green button"
            style={{
              lineHeight: '26px',
              padding: '0.4em 0.2em',
              textAlign: 'left',
            }}
          >
            <img
              src="/images/stack-icon.png"
              alt="stack-icon"
              style={{ width: '25px', height: 'auto', float: 'left' }}
            />
            {/* {titleize(this.props.app.name)} */} name
          </button>
          <div className="ui link list" style={{ marginTop: '30px' }}>
            {/* {this.renderAllContainers()} */} all container
          </div>
          {/* {itemsList} */} itemlist
        </div>
        <div
          // className={classNames({
          //   'fourteen wide column': this.props.container.isSingleItem,
          //   'eleven wide column': !this.props.container.isSingleItem,
          // })}
          style={{ paddingLeft: '0' }}
        >
          <div className="content-wrapper" style={{ padding: '25px 35px' }}>
            {!this.props.isContainerView ? (
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
                    {isUndefined(this.props.item) &&
                      !this.props.container.isSingleItem && (
                        <a
                          className="small ui negative right labeled icon button"
                          onClick={() => this.deleteItem()}
                        >
                          <i className="trash outline icon" />
                          Delete
                        </a>
                      )}
                  </div>
                </div>
                <div className="ui divider" />
                <div className="ui form item">
                  {this.loadFields()}
                  <div className="ui error message" />
                </div>
                {isUndefined(this.props.item) && (
                  <div className="ui grid">
                    <div className="sixteen wide column">
                      <a
                        className="pull-right"
                        style={{ marginTop: '10px', marginBottom: '20px' }}
                        // href={StackableApi.getItem(
                        //   this.props.app.publicKey,
                        //   this.props.item.getId(),
                        // )}
                        target="_blank"
                      >
                        api url <i className="icon share" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="ui center aligned piled segment">
                <p>No item selected.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemUpdateForm;
