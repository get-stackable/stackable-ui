import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const itemsQuery = gql`
  query($containerId: ID!, $appId: ID!) {
    allItems(containerId: $containerId, appId: $appId) {
      id
      data
    }
  }
`;

const AllItems = ({ items, itemId }) => {
  if (items.length === 0) {
    return (
      <div className="item">
        <div className="content">No items found.</div>
      </div>
    );
  }

  return items.map(item => (
    <div className={`item ${itemId === item.id && 'active'}`}>
      <div className="right floated content">
        {/* <div className="ui button">Add</div> */}
      </div>
      <div className="content">
        <a
          className="header"
          // onClick={() => FlowRouter.go('itemUpdate', { id: item.getId() })}
        />
        <div className="description">created {item.relDate()}</div>
      </div>
    </div>
  ));
};

const ItemList = ({ itemId, containerId, appId }) => (
  <div className="three wide column items-list">
    {console.log(containerId, appId)}
    <a
      className="ui primary tiny right floated labeled icon button"
      style={{ marginRight: '10px' }}
      // href={FlowRouter.path('itemCreate', {
      //   containerId: this.props.container._id,
      // })}
    >
      <i className="plus icon" />
      create
      {/* {pluralize(this.props.container.name.toLowerCase(), 1)} */}
    </a>
    <div
      className="ui middle aligned divided link list"
      style={{ marginTop: '40px' }}
    >
      <Query query={itemsQuery} variables={{ containerId, appId }}>
        {({ loading, error, data }) => {
          if (loading) return 'loading..';
          if (error) return 'error..';
          console.log('items', data);
          return <AllItems items={data.allItems} itemId={itemId} />;
        }}
      </Query>
    </div>
  </div>
);

export default ItemList;
