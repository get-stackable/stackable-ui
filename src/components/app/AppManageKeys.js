import React from 'react';
import PropTypes from 'prop-types';
// import alertify from 'alertify.js'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import AllowedUrlsForm from './form/AllowedUrlsForm';
// TODO: Update cache
const updateApplicationMutation = gql`
  mutation updateApplication($id: ID!, $allowedUrls: String!) {
    updateApplication(id: $id, input: { allowedUrls: $allowedUrls }) {
      id
    }
  }
`;

const generateKeyApplicationMutation = gql`
  mutation generateKeyApplication($id: ID!) {
    generateKeyApplication(id: $id) {
      id
    }
  }
`;

const ResetKey = ({ appId, query }) => (
  <Mutation
    mutation={generateKeyApplicationMutation}
    refetchQueries={() => [{ query, variables: { id: appId } }]}
  >
    {(generateKeyApplication, { loading, error }) => {
      if (loading)
        return <a className="mini negative ui loading button">Reset Keys</a>;
      if (error) return `Error! ${error.message}`;
      return (
        <a
          className="mini negative ui button"
          onClick={() => {
            generateKeyApplication({ variables: { id: appId } });
          }}
        >
          Reset Keys
        </a>
      );
    }}
  </Mutation>
);

class AppManageKeys extends React.Component {
  render() {
    const { app, query } = this.props;
    const appId = app.id;
    return (
      <div className="ui form">
        <div className="field">
          <label htmlFor="publicKey">
            Public Key
            <input type="text" value={app.publicKey} readOnly />
          </label>
        </div>
        <div className="field">
          <label htmlFor="privateKey">
            Private Key
            <input type="text" value={app.privateKey} readOnly />
          </label>
        </div>
        <ResetKey appId={appId} query={query} />
        <div className="ui divider" />
        <Mutation mutation={updateApplicationMutation}>
          {(updateApplication, { loading, error }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <AllowedUrlsForm
                submit={input => {
                  updateApplication({
                    variables: {
                      id: appId,
                      ...input,
                    },
                  });
                }}
              />
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default AppManageKeys;

AppManageKeys.propTypes = {
  app: PropTypes.shape({
    appId: PropTypes.string,
    privateKey: PropTypes.string,
    publicKey: PropTypes.string,
  }).isRequired,
  query: PropTypes.object.isRequired,
};

ResetKey.propTypes = {
  appId: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
};
