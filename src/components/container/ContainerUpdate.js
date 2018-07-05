import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import { ContainerFragment } from '../../utils/fragments';
import ContainerUpdateForm from './ContainerUpdateForm';

const containerQuery = gql`
  ${ContainerFragment}
  query container($id: ID!) {
    container(id: $id) {
      ...ContainerFragment
    }
  }
`;

const stackQuery = gql`
  {
    stack @client {
      appId
    }
  }
`;

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

const updateContainerMutation = gql`
  mutation updateContainer(
    $id: ID!
    $name: String
    $fields: [ContainerFieldInput]
  ) {
    updateContainer(id: $id, input: { name: $name, fields: $fields }) {
      id
      name
      fields {
        name
      }
    }
  }
`;

const Stack = () => (
  <Query query={stackQuery}>
    {({ data, client }) => (
      <div>
        {console.log('appid')}
        <p>{data && data.stack && `🐑 Counter: ${data.stack.appId}`}</p>
        {/* <button onClick={() => handleIncrement(data, client)}>Increment</button> */}
      </div>
    )}
  </Query>
);

const ContainerMutation = ({ data, id }) => {
  if (data == null) {
    console.log('create Mutation');
    return (
      <Mutation
        mutation={createContainerMutation}
        // onCompleted={() => <Redirect to={{ pathname: `containers/${id}` }} />}
      >
        {createContainer => (
          <ContainerUpdateForm
            mutation={input => {
              console.log('results', ...input);
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
  console.log('Update Mutation');
  return (
    <Mutation mutation={updateContainerMutation}>
      {updateContainer => (
        <ContainerUpdateForm
          container={data.container}
          mutation={input => {
            console.log('results', input);
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
        <Stack />
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
