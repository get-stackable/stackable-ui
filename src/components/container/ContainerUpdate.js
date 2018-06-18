import React from 'react';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { kebabCase } from 'lodash';

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
    $name: String
    $fieldName: String
    $fieldDescription: String
    $slug: String
    $type: String
    $isRequired: Boolean
    $isDisabled: Boolean
    $min: Int
    $max: Int
    $between: Int
  ) {
    createContainer(
      appId: $appId
      input: {
        name: $name
        fields: [
          {
            name: $fieldName
            slug: $slug
            description: $fieldDescription
            type: $type
            isRequired: $isRequired
            isDisabled: $isDisabled
            validation: { max: $max, min: $min, between: $between }
          }
        ]
      }
    ) {
      id
      name
    }
  }
`;

// const updateContainerMutation = gql`
//   mutation updateContainer($id: ID!, $fields: ContainerInput) {
//     updateContainer(id: $id, input: { fields: $fields }) {
//       id
//       name
//       ...fields
//     }
//   }
// `;

class ContainerUpdate extends React.Component {
  containerMutation(values, createContainer) {
    const containerName = values.name;
    const containerFields = values.fields;
    const fieldValidations = containerFields.validations;

    console.log('createContainer', createContainer);

    createContainer({
      variables: {
        appId: '5aec36c107002743c9e3e381',
        name: containerName,
      },
    });
  }
  // input: {
  //   name: containerName,
  //   fields: [
  //     containerFields.map(field => ({
  //       name: field.name,
  //       slug: kebabCase(field.name),
  //       description: field.description,
  //       type: field.type,
  //       isRequired: field.isRequired,
  //       isDisabled: field.isDisabled,
  //       validations: { ...fieldValidations },
  //     })),
  //   ],
  // },
  render() {
    // const { location } = this.props;

    return (
      <React.Fragment>
        <Query
          query={containerQuery}
          variables={{ id: '5b1f82e23afef55d654649d0' }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <React.Fragment>
                <Mutation
                  mutation={createContainerMutation}
                  variables={{
                    appId: '5aec36c107002743c9e3e381',
                    name: 'helo',
                  }}
                >
                  {createContainer => (
                    <React.Fragment>
                      <ContainerUpdateForm
                        container={data.container}
                        mutation={values => {
                          createContainer({
                            variables: {
                              appId: '5aec36c107002743c9e3e381',
                              name: 'helo',
                            },
                          });
                        }}
                      />
                    </React.Fragment>
                  )}
                </Mutation>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default ContainerUpdate;
