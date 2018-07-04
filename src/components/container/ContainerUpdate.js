import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import ContainerUpdateForm from './ContainerUpdateForm';

const containerQuery = gql`
  query container($id: ID!) {
    container(id: $id) {
      name
      fields {
        id
        name
        slug
        description
        type
        isRequired
        isDisabled
        validation {
          between
          min
          max
        }
      }
    }
  }
`;

const createContainerMutation = gql`
  mutation createContainer(
    $appId: ID!
    $name: String # $fieldName: String # $fieldDescription: String # $slug: String # $type: String # $isRequired: Boolean # $isDisabled: Boolean # $min: Int # $max: Int # $between: Int
  ) {
    createContainer(
      appId: $appId
      input: {
        name: $name
        # fields: [
        #   {
        #     name: $fieldName
        #     slug: $slug
        #     description: $fieldDescription
        #         type: $type
        #         isRequired: $isRequired
        #         isDisabled: $isDisabled
        #         validation: { max: $max, min: $min, between: $between }
        #   }
        # ]
      }
    ) {
      id
      name
    }
  }
`;

const updateContainerMutation = gql`
  mutation updateContainer(
    $id: ID!
    $name: String
    $fields: [ContainerFieldInput] # $fieldName: String # $fieldDescription: String # $slug: String # $type: String # $isRequired: Boolean # $isDisabled: Boolean # $min: Int # $max: Int # $between: Int
  ) {
    updateContainer(id: $id, input: { name: $name, fields: $fields }) {
      id
      name
    }
  }
`;

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
                  name: input.name,
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
                name: 'boomrang',
                fields: [{ name: 'hello' }],
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
