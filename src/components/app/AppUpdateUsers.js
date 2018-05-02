import React from 'react';
// import PropTypes from 'prop-types';
// import alertify from 'alertify.js';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { isEmpty } from 'lodash';

import AppUpdateUserForm from '../app/form/AppUpdateUserForm';

const allUserQuery = gql`
  query($ids: [String]!) {
    allUsers(ids: $ids) {
      id
      email
    }
  }
`;
const addUserApplicationMutation = gql`
  mutation addUserApplication($appId: ID!, $userEmail: String!) {
    addUserApplication(appId: $appId, userEmail: $userEmail) {
      id
      name
    }
  }
`;

const AddUsers = appId => (
  <Mutation mutation={addUserApplicationMutation}>
    {(addUserApplication, { loading, error }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      return (
        <AppUpdateUserForm
          submit={input => {
            addUserApplication({
              variables: { appId, userEmail: input.email },
            });
          }}
        />
      );
    }}
  </Mutation>
);

class AppUpdateUsers extends React.Component {
  removeUser = () => {};

  renderUsers(appId) {
    return (
      <Query query={allUserQuery} variables={{ ids: appId }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          if (isEmpty(data.allUsers)) return 'No User found';

          return (
            <tr>
              <td>email</td>
              <td>
                <a className="mini negative ui button">remove</a>
              </td>
            </tr>
          );
        }}
      </Query>
    );
  }

  render() {
    const { appId } = this.props;
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{this.renderUsers(appId)}</tbody>
        <tfoot>
          <tr>
            <th colSpan="3">
              <AddUsers appId={appId} />
            </th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default AppUpdateUsers;
