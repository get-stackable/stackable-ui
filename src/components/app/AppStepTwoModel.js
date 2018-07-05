import React from 'react';
import gql from 'graphql-tag';
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
        {createApplication => (
          <React.Fragment>
            <AppForm
              type="create"
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
