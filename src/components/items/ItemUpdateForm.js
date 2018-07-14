import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { ContainerFragment } from '../../utils/fragments';

import ItemForm from './ItemForm';

// Conatiner Query
const containerQuery = gql`
  ${ContainerFragment}
  query container($id: ID!) {
    container(id: $id) {
      ...ContainerFragment
    }
  }
`;

class ItemUpdateForm extends React.Component {
  doSubmit(items) {
    console.log('vchvcjhds', items);
  }
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
              <Query
                query={containerQuery}
                variables={{ id: '5b473c31a744af1c9859089f' }}
              >
                {({ loading, error, data }) => {
                  if (loading) return 'loading....';
                  if (error) return 'error';
                  console.log('data', data);

                  return (
                    <React.Fragment>
                      <ItemForm
                        container={data.container}
                        submit={this.doSubmit}
                      />
                    </React.Fragment>
                  );
                }}
              </Query>
              <div className="ui error message" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemUpdateForm;
