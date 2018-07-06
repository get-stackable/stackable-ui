import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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

const ContainerMutation = ({ data, id }) => {
  if (data == null) {
    return (
      <Mutation
        mutation={createContainerMutation}
        // onCompleted={() => <Redirect to={{ pathname: `containers/${id}` }} />}
      >
        {createContainer => (
          <ContainerUpdateForm
            mutation={input => {
              createContainer({
                variables: {
                  appId: id,
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
    <Mutation mutation={updateContainerMutation}>
      {updateContainer => (
        <ContainerUpdateForm
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
    const { url, id } = this.props;
    return (
      <React.Fragment>
        {url === `/container/update/${id}` ? (
          <Query query={containerQuery} variables={{ id }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              return <ContainerMutation data={data} id={id} />;
            }}
          </Query>
        ) : (
          <ContainerMutation id={id} />
        )}
      </React.Fragment>
    );
  }
}

export default ContainerUpdate;
