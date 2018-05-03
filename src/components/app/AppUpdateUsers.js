import React from 'react';
// import PropTypes from 'prop-types';
// import alertify from 'alertify.js';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { isEmpty } from 'lodash';

import AppUpdateUserForm from './form/AppUpdateUserForm';

// TODO: Minor Fixes

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

const removeUserApplicationMutation = gql`
  mutation removeUserApplication($appId: ID!, $userId: String!) {
    removeUserApplication(appId: $appId, userId: $userId) {
      id
      name
    }
  }
`;

const AddUsers = ({ appId }) => (
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

// TODO: Check, PropsType Validation

const RemoveUser = ({ appId, userId }) => (
  <Mutation mutation={removeUserApplicationMutation}>
    {(removeUserApplication, { loading, error }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      return (
        <a
          className="mini negative ui button"
          onClick={() => {
            removeUserApplication({
              variables: { appId, userId },
            });
          }}
        >
          remove
        </a>
      );
    }}
  </Mutation>
);

const AllUsers = ({ appId }) => (
  <Query query={allUserQuery} variables={{ ids: appId }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      if (isEmpty(data.allUsers)) return 'No User found';

      return (
        <React.Fragment>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <RemoveUser appId={appId} userId={user.id} />
              </td>
            </tr>
          ))}
        </React.Fragment>
      );
    }}
  </Query>
);

class AppUpdateUsers extends React.Component {
  removeUser = () => {};

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
        <tbody>
          <AllUsers appId={appId} />
        </tbody>
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
