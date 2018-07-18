import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import alertify from 'alertify.js';
import { isUndefined } from 'lodash';

import { ContainerFragment } from '../../utils/fragments';

import ItemUpdateForm from './ItemUpdateForm';

// Conatiner Query
const containerQuery = gql`
  ${ContainerFragment}
  query container($id: ID!) {
    container(id: $id) {
      ...ContainerFragment
    }
  }
`;

// Conatiner Query
const itemQuery = gql`
  query item($id: ID!) {
    item(id: $id) {
      id
      data
    }
  }
`;

const itemsQuery = gql`
  query($containerId: ID!, $appId: ID!) {
    allItems(containerId: $containerId, appId: $appId) {
      id
      data
      publishedAt
    }
  }
`;

// Item Create Mutation
const createItemMutation = gql`
  mutation createItem($containerId: ID!, $appId: ID!, $input: JSON!) {
    createItem(containerId: $containerId, appId: $appId, input: $input) {
      id
    }
  }
`;

// Item Update Mutation
const updateItemMutation = gql`
  mutation updateItem($id: ID!, $input: JSON!) {
    updateItem(id: $id, input: $input) {
      id
    }
  }
`;

const ItemQuery = ({ container, ids, url, history }) => (
  <React.Fragment>
    {url ===
    `/stack/${ids.appId}/container/${ids.containerId}/item/${ids.id}/update` ? (
      <Query query={itemQuery} variables={{ id: ids.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'loadin...';
          if (error) return 'erro...';
          return (
            <ItemMutation
              container={container}
              item={data.item}
              ids={ids}
              history={history}
            />
          );
        }}
      </Query>
    ) : (
      <React.Fragment>
        <ItemMutation container={container} ids={ids} />
      </React.Fragment>
    )}
  </React.Fragment>
);

const ItemMutation = ({ container, item, ids, history }) => {
  const onItemUpdate = (cache, { data: { createApplication } }) => {
    const { allItems } = cache.readQuery({ query: itemsQuery });
    cache.writeQuery({
      query: itemsQuery,
      data: { allItems: allItems.concat([createApplication]) },
    });
  };

  if (item === null || isUndefined(item)) {
    return (
      <Mutation
        mutation={createItemMutation}
        update={onItemUpdate}
        onCompleted={() => alertify.success('item added sucessfully')}
        onError={error => alertify.error(error.message)}
      >
        {createItem => (
          <ItemUpdateForm
            item={item}
            container={container}
            mutation={input =>
              createItem({
                variables: {
                  appId: ids.appId,
                  containerId: ids.containerId,

                  input,
                },
              })
            }
          />
        )}
      </Mutation>
    );
  }
  return (
    <Mutation
      mutation={updateItemMutation}
      onCompleted={() => alertify.success('item updated sucessfully')}
      onError={error => alertify.error(error.message)}
    >
      {updateItem => (
        <ItemUpdateForm
          item={item}
          container={container}
          history={history}
          ids={ids}
          mutation={input => {
            console.log('final Item Mutation', input);
            updateItem({
              variables: {
                id: ids.id,
                input,
              },
            });
          }}
        />
      )}
    </Mutation>
  );
};

const ItemUpdate = ({ ids, url, history }) => (
  <Query query={containerQuery} variables={{ id: ids.containerId }}>
    {({ loading, error, data }) => {
      if (loading) return 'loading....';
      if (error) return 'error';
      return (
        <React.Fragment>
          <ItemQuery
            container={data.container}
            ids={ids}
            url={url}
            history={history}
          />
        </React.Fragment>
      );
    }}
  </Query>
);

export default ItemUpdate;
