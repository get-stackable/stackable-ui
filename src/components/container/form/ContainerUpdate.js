import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ContainerUpdateForm from '../ContainerUpdateForm';

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

class ContainerUpdate extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Query
          query={containerQuery}
          variables={{ id: '5b1f82e23afef55d654649d0' }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return <ContainerUpdateForm container={data.container} />;
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default ContainerUpdate;
