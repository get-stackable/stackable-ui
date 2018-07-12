import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import alertify from 'alertify.js';

import { ContainerFragment } from '../../utils/fragments';
import ContainerUpdateForm from './ContainerUpdateForm';

// Conatiner Query
const containerQuery = gql`
  ${ContainerFragment}
  query container($id: ID!) {
    container(id: $id) {
      ...ContainerFragment
    }
  }
`;

// Create Container Mutation
const createContainerMutation = gql`
  ${ContainerFragment}
  mutation createContainer(
    $appId: ID!
    $name: String
    $fields: [ContainerFieldInput]
  ) {
    createContainer(appId: $appId, input: { name: $name, fields: $fields }) {
      ...ContainerFragment
    }
  }
`;

// Update Conatiner Mutation
const updateContainerMutation = gql`
  ${ContainerFragment}
  mutation updateContainer(
    $id: ID!
    $name: String
    $fields: [ContainerFieldInput]
  ) {
    updateContainer(id: $id, input: { name: $name, fields: $fields }) {
      ...ContainerFragment
    }
  }
`;

const ContainerMutation = ({ data, id, appId, history, url }) => {
  if (data == null) {
    return (
      <Mutation
        mutation={createContainerMutation}
        onError={error => {
          alertify.error(error.message);
        }}
        onCompleted={item => {
          alertify.success(
            `${item.createContainer.name} container created sucessfully`,
          );
          setTimeout(() => {
            history.push(
              `/stack/${appId}/container/${item.createContainer.id}/update`,
            );
          }, 1000);
        }}
      >
        {createContainer => (
          <ContainerUpdateForm
            appId={appId}
            url={url}
            mutation={input => {
              createContainer({
                variables: {
                  appId,
                  ...input,
                },
              });
            }}
          />
        )}
      </Mutation>
    );
  }
  return (
    <Mutation
      mutation={updateContainerMutation}
      onError={error => {
        alertify.error(error.message);
      }}
      onCompleted={() => {
        alertify.success('added field Updated Suceesfully');
      }}
    >
      {updateContainer => (
        <ContainerUpdateForm
          appId={appId}
          id={id}
          history={history}
          url={url}
          container={data.container}
          mutation={input => {
            updateContainer({
              variables: {
                id,
                ...input,
              },
            });
          }}
        />
      )}
    </Mutation>
  );
};

class ContainerUpdate extends React.Component {
  render() {
    const { url, ids, history } = this.props;

    return (
      <React.Fragment>
        {url === `/stack/${ids.appId}/container/${ids.id}/update` ? (
          <Query query={containerQuery} variables={{ id: ids.id }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              return (
                <ContainerMutation
                  data={data}
                  id={ids.id}
                  appId={ids.appId}
                  url={url}
                  history={history}
                />
              );
            }}
          </Query>
        ) : (
          <ContainerMutation appId={ids.appId} history={history} url={url} />
        )}
      </React.Fragment>
    );
  }
}

export default ContainerUpdate;
