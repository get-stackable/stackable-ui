import React from 'react';
import gql from 'graphql-tag';
import alertify from 'alertify.js';
import { Mutation } from 'react-apollo';

import AppForm from './form/AppForm';

const createAppMutation = gql`
  mutation createApplication($name: String!, $description: String) {
    createApplication(input: { name: $name, description: $description }) {
      id
      name
    }
  }
`;
class AppStepTwoModel extends React.Component {
  render() {
    return (
      <Mutation mutation={createAppMutation}>
        {(createApplication, { loading, error, data }) => (
          <React.Fragment>
            {data && alertify.success('App Created Successfully!')}
            {loading && <p>Loading...</p>}
            {error && alertify.success('Error :( Please try again!')}
            <AppForm
              submit={input => {
                createApplication({ variables: { ...input } });
              }}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default AppStepTwoModel;
