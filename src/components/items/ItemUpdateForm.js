import React from 'react';
import { isUndefined, sortBy } from 'lodash';

import ItemFields from './ItemFields';

class ItemUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.initState(nextProps));
  }

  handleChange(inputName, e) {
    const change = {};
    change[inputName] = !isUndefined(e.target) ? e.target.value : e;
    this.setState(change);
  }

  // onChange = (inputName, e) => {
  //   const change = {};
  //   change[inputName] = !isUndefined(e.target) ? e.target.value : e;
  //   this.setState(change);
  // };

  initState(props) {
    // if (this.props.isContainerView) {
    //   return {};
    // }

    const stateData = {};
    const containerItems = sortBy(props.container.fields, 'listing_order');
    containerItems.map(schema => {
      if (isUndefined(props.item)) {
        stateData[schema.slug] = '';
      }
      // stateData[schema.slug] = props.item.data[schema.slug];
    });
    return stateData;
  }

  doSubmit = () => {
    console.log(this.state);
    this.props.mutation(this.state);
  };

  render() {
    const { container, item } = this.props;
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
              <ItemFields
                container={container}
                items={this.state}
                handleChange={this.handleChange}
              />
              <div className="ui error message" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemUpdateForm;
