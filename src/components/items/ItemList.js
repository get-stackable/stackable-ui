import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { capitalize } from 'lodash';
import moment from 'moment';

const itemsQuery = gql`
  query itemsQuery($containerId: ID!, $appId: ID!) {
    allItems(containerId: $containerId, appId: $appId) {
      id
      data
      publishedAt
    }
  }
`;

const AllItems = ({ items, itemId, appId, containerId }) => {
  if (items.length === 0) {
    return (
      <div className="item">
        <div className="content">No items found.</div>
      </div>
    );
  }

  return items.map(item => (
    <div className={`item ${itemId === item.id ? 'active' : ''}`} key={item.id}>
      <div className="right floated content">
        {/* <div className="ui button">Add</div> */}
      </div>
      <div className="content">
        <Link
          className="header"
          to={{
            pathname: `/stack/${appId}/container/${containerId}/item/${
              item.id
            }/update`,
          }}
        >
          {capitalize(item.data[Object.keys(item.data)[0]])}
          <div className="description">
            created {/* TODO: need to fix */}
            {moment()
              .startOf(`${item.publishedAt}`)
              .fromNow()}
          </div>
        </Link>
      </div>
    </div>
  ));
};

const ItemList = ({ itemId, containerId, appId }) => (
  <div className="three wide column items-list">
    <Link
      className="ui primary tiny right floated labeled icon button"
      style={{ marginRight: '10px' }}
      to={{ pathname: `/stack/${appId}/container/${containerId}/item/create` }}
    >
      <i className="plus icon" />
      create new item
    </Link>
    <div
      className="ui middle aligned divided link list"
      style={{ marginTop: '40px' }}
    >
      <Query query={itemsQuery} variables={{ containerId, appId }}>
        {({ loading, error, data }) => {
          if (loading) return 'loading..';
          if (error) return 'error..';
          return (
            <AllItems
              items={data.allItems}
              itemId={itemId}
              appId={appId}
              containerId={containerId}
            />
          );
        }}
      </Query>
    </div>
  </div>
);

export default ItemList;
