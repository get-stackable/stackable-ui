import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { AppFragment } from '../../utils/fragments';
import AppForm from './form/AppForm';

const applicationsQuery = gql`
  ${AppFragment}
  {
    allApplications {
      ...AppFragment
    }
  }
`;

const createAppMutation = gql`
  ${AppFragment}
  mutation createApplication($name: String!, $description: String) {
    createApplication(input: { name: $name, description: $description }) {
      ...AppFragment
    }
  }
`;
class AppStepTwoModel extends React.Component {
  render() {
    const onAppUpdate = (cache, { data: { createApplication } }) => {
      const { allApplications } = cache.readQuery({ query: applicationsQuery });
      cache.writeQuery({
        query: applicationsQuery,
        data: { allApplications: allApplications.concat([createApplication]) },
      });
    };
    return (
      <Mutation
        mutation={createAppMutation}
        update={onAppUpdate}
        onCompleted={data => {
          this.props.history.push(`/stack/${data.createApplication.id}`);
        }}
      >
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
