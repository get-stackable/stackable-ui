import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import AppCreateForm from './form/AppCreateForm';


const createAppMutation = gql`
  mutation createApplication($name: String, $description: String, $isActive: Boolean, $allowedUrls: String, $libraryId: String,) {
    createApplication( input:{name:$name, description:$description, isActive:$isActive, allowedUrls:$allowedUrls}, libraryId:libraryId) {
      id
      name
    }
  }
`;

class AppStepTwoModel extends React.Component {
  render() {
    return (
      <Mutation mutation={createAppMutation} update={{ input: { name: 'nasim', description: 'boom' } }}>
        <AppCreateForm />
      </Mutation>
    );
  }
}

export default AppStepTwoModel;
