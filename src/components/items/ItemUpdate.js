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
      data
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

const ItemQuery = ({ container, ids, url }) => (
  <React.Fragment>
    {url ===
    `/stack/${ids.appId}/container/${ids.containerId}/item/${ids.id}` ? (
      <Query query={itemQuery} variables={{ id: '5b4c677eeb2d155120038aed' }}>
        {({ loading, error, data }) => {
          if (loading) return 'loadin...';
          if (error) return 'erro...';
          console.log('itemdata', data);
          return <ItemMutation container={container} item={data.item} />;
        }}
      </Query>
    ) : (
      <ItemMutation container={container} />
    )}
  </React.Fragment>
);

const ItemMutation = ({ container, item }) => {
  if (item === null) {
    return (
      <Mutation
        mutation={createItemMutation}
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
                  containerId: '5b473c31a744af1c9859089f',
                  appId: '5b41d6ca25a78576e6e64e82',
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
          mutation={input =>
            updateItem({
              variables: {
                id: '5b4c677eeb2d155120038aed',
                input,
              },
            })
          }
        />
      )}
    </Mutation>
  );
};

const ItemUpdate = ({ ids, url }) => (
  <Query query={containerQuery} variables={{ id: ids.containerId }}>
    {({ loading, error, data }) => {
      if (loading) return 'loading....';
      if (error) return 'error';
      return <ItemQuery container={data.container} ids={ids} url={url} />;
    }}
  </Query>
);

export default ItemUpdate;
