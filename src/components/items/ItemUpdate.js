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

// Items Query
const itemsQuery = gql`
  query itemsQuery($containerId: ID!, $appId: ID!) {
    allItems(containerId: $containerId, appId: $appId) {
      id
      data
      publishedAt
    }
  }
`;

const itemQuery = gql`
  query item($id: ID!) {
    item(id: $id) {
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
      data
      publishedAt
    }
  }
`;

// Item Update Mutation
const updateItemMutation = gql`
  mutation updateItem($id: ID!, $input: JSON!) {
    updateItem(id: $id, input: $input) {
      id
      data
      publishedAt
    }
  }
`;

const ItemMutation = ({ container, item, ids, history }) => {
  if (item === null || isUndefined(item)) {
    return (
      <Mutation
        mutation={createItemMutation}
        onCompleted={e => {
          alertify.success('deleted sucessfully');
          setTimeout(() => {
            history.push(
              `/stack/${ids.appId}/container/${ids.containerId}/item/${
                e.createItem.id
              }/update`,
            );
          }, 1000);
        }}
        refetchQueries={() => [
          {
            query: itemsQuery,
            variables: { containerId: ids.containerId, appId: ids.appId },
          },
        ]}
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
      refetchQueries={() => [{ query: itemQuery, variables: { id: ids.id } }]}
    >
      {updateItem => (
        <ItemUpdateForm
          item={item}
          container={container}
          history={history}
          ids={ids}
          mutation={input => {
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
        <ItemMutation container={container} ids={ids} history={history} />
      </React.Fragment>
    )}
  </React.Fragment>
);
class ItemUpdate extends React.Component {
  render() {
    const { ids, url, history } = this.props;
    return (
      <Query query={containerQuery} variables={{ id: ids.containerId }}>
        {({ loading, error, data }) => {
          if (loading) return 'loading....';
          if (error) return 'error';
          return (
            <ItemQuery
              container={data.container}
              ids={ids}
              url={url}
              history={history}
            />
          );
        }}
      </Query>
    );
  }
}

export default ItemUpdate;
