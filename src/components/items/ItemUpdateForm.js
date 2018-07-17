import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { isUndefined, sortBy } from 'lodash';
import alertify from 'alertify.js';

import ItemFields from './ItemFields';

// Item Delete Mutation
const deleteItemMutation = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteMutation = ({ ids, history }) => (
  <Mutation
    mutation={deleteItemMutation}
    onError={error => alertify.error(error.message)}
    onCompleted={() => {
      alertify.success('deleted sucessfully');
      setTimeout(() => {
        history.push(
          `/stack/${ids.appId}/container/${ids.containerId}/item/create`,
        );
      }, 1000);
    }}
  >
    {deleteItem => (
      <a
        className="small ui negative right labeled icon button"
        onClick={() => {
          alertify.confirm(
            `Do you want to delete this Item? All related fields will be also deleted!`,
            () => {
              deleteItem({ variables: { id: ids.id } });
            },
            () => {},
          );
        }}
      >
        <i className="trash outline icon" />
        Delete
      </a>
    )}
  </Mutation>
);

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

  initState(props) {
    const stateData = {};
    const containerItems = sortBy(props.container.fields, 'listing_order');
    containerItems.map(schema => {
      if (isUndefined(props.item) || props.item === null) {
        stateData[schema.slug] = '';
      } else {
        stateData[schema.slug] = props.item.data[schema.slug];
      }
    });
    return stateData;
  }

  doSubmit = () => {
    this.props.mutation(this.state);
  };

  render() {
    const { ids, container, item, history } = this.props;
    return (
      <div
        className="eleven wide column"
        // className={classNames({
        //   'fourteen wide column': this.props.container.isSingleItem,
        //   'eleven wide column': !this.props.container.isSingleItem,
        // })}
        style={{ paddingLeft: '0' }}
      >
        <div
          className="content-wrapper"
          style={{ padding: '25px 35px', height: '100%' }}
        >
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
                {!isUndefined(item) && (
                  <DeleteMutation ids={ids} history={history} />
                )}
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
